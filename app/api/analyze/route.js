import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    const body = await request.json();
    const document = body.document;
    const language = body.language || "English";

    if (!document || document.trim().length < 50) {
      return Response.json({ error: "Please provide a valid document." }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 2000,
      messages: [
        {
          role: "system",
          content: `You are an expert legal assistant.
IMPORTANT: Always use these EXACT English headings. Write CONTENT in ${language} language.
Use rupee symbol for all money amounts.

## CONTRACT TYPE
Detect the type and write ONLY one of these exact words: Rental, Freelance, Employment, Service, Loan, Partnership, NDA, Terms of Service, Other

## TL;DR
- point 1
- point 2
- point 3

## DETAILED SUMMARY
write summary here in ${language}

## KEY CLAUSES
Payment Terms: explain in ${language}
Termination: explain in ${language}
Liability: explain in ${language}
Confidentiality: explain in ${language}
Jurisdiction: explain in ${language}
Other: explain in ${language}

## RISKS IDENTIFIED
- [HIGH RISK] explanation in ${language}
- [MEDIUM RISK] explanation in ${language}
- [LOW RISK] explanation in ${language}

## SIMPLIFIED LANGUAGE
rewrite complex parts in simple ${language}

## SUGGESTIONS
- tip 1 in ${language}
- tip 2 in ${language}

## USER QUESTIONS
Can I exit easily? answer in ${language}
Are there financial risks? answer in ${language}
What are my obligations? answer in ${language}

CRITICAL RULES:
- Headings must ALWAYS be in English exactly as shown
- Content must be in ${language} language
- Use rupee symbol for money
- Do not add extra headings`,
        },
        {
          role: "user",
          content: "Analyze this contract:\n\n" + document,
        },
      ],
    });

    const result = completion.choices[0].message.content;

    // Extract contract type
    const typeMatch = result.match(/## CONTRACT TYPE\s*\n([^\n]+)/);
    const contractType = typeMatch ? typeMatch[1].trim() : "Other";

    // Extract risk score based on HIGH RISK count
    const highRisks = (result.match(/\[HIGH RISK\]/g) || []).length;
    const mediumRisks = (result.match(/\[MEDIUM RISK\]/g) || []).length;
    const riskScore = Math.min(10, highRisks * 3 + mediumRisks * 1 + 2);

    return Response.json({ result, contractType, riskScore });

  } catch (error) {
    console.error("ERROR:", error);
    return Response.json({ error: error.message || "Something went wrong." }, { status: 500 });
  }
}