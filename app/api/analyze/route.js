import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    const { document, language } = await request.json();

    if (!document || document.trim().length < 50) {
      return Response.json({ error: "Document too short." }, { status: 400 });
    }

    const prompt = `You are a legal contract analyzer for Indian contracts. Analyze this contract and respond in ${language}.

Return your response in EXACTLY this format with these exact headings:

## TL;DR
[2-3 sentence plain summary of what this contract is about]

## DETAILED SUMMARY
[Detailed paragraph summary of all key terms]

## KEY CLAUSES
[List the most important clauses as bullet points]

## RISKS IDENTIFIED
[List each risk with severity tag]
- [HIGH RISK] description
- [MEDIUM RISK] description  
- [LOW RISK] description

## SIMPLIFIED LANGUAGE
[Rewrite the most confusing parts in simple plain language]

## SUGGESTIONS
[List negotiation tips and what to ask for before signing]

## USER QUESTIONS
[Answer: Is this contract safe? What happens if I cancel? Are there hidden charges?]

## RISK_SCORES
FINANCIAL_RISK:[0-10]
LEGAL_RISK:[0-10]
PRIVACY_RISK:[0-10]
OVERALL:[0-10]
CONTRACT_TYPE:[Rental/Freelance/Employment/Service/Loan/NDA/Other]

Contract to analyze:
${document}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content;

    const getScore = (label) => {
      const match = result.match(new RegExp(`${label}:(\\d+)`));
      return match ? parseInt(match[1]) : 5;
    };

    const financialRisk = getScore("FINANCIAL_RISK");
    const legalRisk = getScore("LEGAL_RISK");
    const privacyRisk = getScore("PRIVACY_RISK");
    const riskScore = getScore("OVERALL");

    const typeMatch = result.match(/CONTRACT_TYPE:(\w+)/);
    const contractType = typeMatch ? typeMatch[1] : "Other";

    return Response.json({
      result,
      riskScore,
      financialRisk,
      legalRisk,
      privacyRisk,
      contractType,
    });

  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}