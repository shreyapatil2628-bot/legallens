import { NextRequest } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("pdf");

    if (!file) {
      return Response.json({ error: "No file uploaded." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfParse = (await import("pdf-parse")).default;
    const data = await pdfParse(buffer);

    return Response.json({ text: data.text });
  } catch (error) {
    console.error("PDF Error:", error);
    return Response.json(
      { error: "Failed to read PDF. Please try copy-pasting instead." },
      { status: 500 }
    );
  }
}