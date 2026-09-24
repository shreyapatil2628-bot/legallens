import Groq from "groq-sdk";

export async function POST(request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { error: "GROQ_API_KEY is missing. Add it to .env.local and restart the server." },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { question, contractText, chatHistory, language } = await request.json();

    if (!question || !contractText) {
      return Response.json({ error: "Missing question or contract." }, { status: 400 });
    }

    const messages = [
      {
        role: "system",
        content: `You are a helpful legal assistant. The user has uploaded a contract and wants to ask questions about it.
Answer ONLY based on what is written in the contract below.
If the answer is not in the contract, say: "This is not mentioned in the contract."
Keep answers short, simple, and in ${language || "English"} language.
Use Indian Rupees symbol for any money amounts.

CONTRACT:
${contractText}`,
      },
      ...chatHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: "user",
        content: question,
      },
    ];

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      max_tokens: 500,
      messages,
    });

    const answer = completion.choices[0].message.content;
    return Response.json({ answer });

  } catch (error) {
    console.error("Chat Error:", error);
    return Response.json({ error: error.message || "Something went wrong." }, { status: 500 });
  }
}