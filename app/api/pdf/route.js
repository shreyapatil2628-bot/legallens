export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("pdf");

    if (!file) {
      return Response.json({ error: "No file uploaded." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const pdfParse = (await import("pdf-parse/lib/pdf-parse.js")).default;
    const data = await pdfParse(buffer);

    if (!data.text || data.text.trim().length < 50) {
      return Response.json(
        { error: "Could not read text from this PDF. Please copy-paste instead." },
        { status: 400 }
      );
    }

    return Response.json({ text: data.text });

  } catch (error) {
    console.error("PDF Error:", error);
    return Response.json(
      { error: "Failed to read PDF. Please try copy-pasting instead." },
      { status: 500 }
    );
  }
}