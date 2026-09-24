import { createWorker } from "tesseract.js";
import { PDFParse } from "pdf-parse";

export const runtime = "nodejs";

let workerPromise;

function getOcrWorker() {
  if (!workerPromise) {
    workerPromise = createWorker("eng").catch((error) => {
      workerPromise = null;
      throw error;
    });
  }
  return workerPromise;
}

async function readImageText(image) {
  const worker = await getOcrWorker();
  const { data } = await worker.recognize(image);
  return (data.text || "").replace(/\s+\n/g, "\n").trim();
}

async function extractPdfText(buffer) {
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const result = await parser.getText();
    const text = (result.text || "").replace(/--\s*\d+\s+of\s+\d+\s*--/g, "").trim();
    if (text.length >= 50) return text;

    const shots = await parser.getScreenshot({ scale: 2, first: 4, imageDataUrl: false });
    const pages = [];
    for (const page of shots.pages || []) {
      if (!page.data) continue;
      const pageText = await readImageText(Buffer.from(page.data));
      if (pageText) pages.push(pageText);
    }
    return pages.join("\n\n").trim() || text;
  } finally {
    await parser.destroy();
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded." }, { status: 400 });
    }

    const fileType = file.type || "";
    const fileName = typeof file.name === "string" ? file.name.toLowerCase() : "";
    const buffer = Buffer.from(await file.arrayBuffer());
    const isPdf = fileType === "application/pdf" || fileName.endsWith(".pdf");

    if (isPdf) {
      try {
        const text = await extractPdfText(buffer);

        if (!text || text.length < 50) {
          return Response.json({
            error: "Could not extract text from this PDF. It may be a scanned image. Please take a photo of it instead."
          }, { status: 400 });
        }

        return Response.json({ text, type: "pdf" });
      } catch (err) {
        console.error("PDF Error:", err);
        return Response.json({
          error: "Failed to read PDF. Please take a photo of the contract instead."
        }, { status: 500 });
      }
    }

    if (fileType.startsWith("image/") || /\.(jpe?g|png|webp|bmp|gif)$/.test(fileName)) {
      try {
        const text = await readImageText(buffer);

        if (!text || text.length < 50) {
          return Response.json({
            error: "Could not read text from this image. Please make sure the image is clear."
          }, { status: 400 });
        }

        return Response.json({ text, type: "image" });
      } catch (err) {
        console.error("Image Error:", err);
        return Response.json({
          error: "Failed to read image. Please make sure it is a clear photo."
        }, { status: 500 });
      }
    }

    return Response.json({
      error: "Unsupported file type. Please upload PDF or image."
    }, { status: 400 });

  } catch (error) {
    console.error("Upload Error:", error);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}