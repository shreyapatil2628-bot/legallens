export const runtime = "nodejs";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file uploaded." }, { status: 400 });
    }

    const fileType = file.type;
    const buffer = Buffer.from(await file.arrayBuffer());

    if (fileType === "application/pdf") {
      try {
        const pdf = await import("pdf-parse/lib/pdf-parse.js");
        const pdfParse = pdf.default;
        const data = await pdfParse(buffer);
        const text = data.text.trim();

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

    if (fileType.startsWith("image/")) {
      try {
        const base64 = buffer.toString("base64");
        const Groq = require("groq-sdk");
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const response = await groq.chat.completions.create({
          model: "meta-llama/llama-4-scout-17b-16e-instruct",
          max_tokens: 3000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: { url: `data:${fileType};base64,${base64}` }
                },
                {
                  type: "text",
                  text: "This is an image of a legal contract. Please extract ALL the text from this image exactly as it appears. Return only the extracted text, nothing else."
                }
              ]
            }
          ]
        });

        const text = response.choices[0].message.content.trim();

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