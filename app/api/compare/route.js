import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request) {
  try {
    const { contract1, contract2, language } = await request.json();

    if (!contract1 || contract1.trim().length < 50) {
      return Response.json({ error: "Contract A is too short." }, { status: 400 });
    }
    if (!contract2 || contract2.trim().length < 50) {
      return Response.json({ error: "Contract B is too short." }, { status: 400 });
    }

    const prompt = `You are a legal contract comparison expert for Indian contracts. Compare these two contracts and respond in ${language}.

Return your response in EXACTLY this format:

## VERDICT
[One clear sentence: which contract is safer and why]

## WINNER
CONTRACT_A or CONTRACT_B or EQUAL

## SCORE_A
[0-10, where 0 = completely safe, 10 = extremely dangerous/risky]

## SCORE_B
[0-10, where 0 = completely safe, 10 = extremely dangerous/risky]

## KEY_DIFFERENCES
- [TOPIC]: Contract A says [X] | Contract B says [Y] | Winner: [A/B/Equal]
- [TOPIC]: Contract A says [X] | Contract B says [Y] | Winner: [A/B/Equal]
- [TOPIC]: Contract A says [X] | Contract B says [Y] | Winner: [A/B/Equal]
- [TOPIC]: Contract A says [X] | Contract B says [Y] | Winner: [A/B/Equal]
- [TOPIC]: Contract A says [X] | Contract B says [Y] | Winner: [A/B/Equal]

## CONTRACT_A_RISKS
- [HIGH RISK] description
- [MEDIUM RISK] description
- [LOW RISK] description

## CONTRACT_B_RISKS
- [HIGH RISK] description
- [MEDIUM RISK] description
- [LOW RISK] description

## CONTRACT_A_ADVANTAGES
- advantage 1
- advantage 2
- advantage 3

## CONTRACT_B_ADVANTAGES
- advantage 1
- advantage 2
- advantage 3

## RECOMMENDATION
[2-3 sentences: practical advice on which to sign and what to negotiate]

IMPORTANT SCORING RULES:
- Higher score = MORE risk = WORSE contract
- Lower score = LESS risk = SAFER contract
- A score of 3 is safer than a score of 8
- The WINNER must always be the contract with the LOWER risk score
- If Contract A scores 8 and Contract B scores 4, then WINNER is CONTRACT_B

CONTRACT A:
${contract1}

CONTRACT B:
${contract2}`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 2500,
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content;

    console.log("Compare result (last 300):", result.slice(-300));

    const winnerMatch = result.match(/## WINNER\s*(CONTRACT_A|CONTRACT_B|EQUAL)/);
    const scoreAMatch = result.match(/## SCORE_A\s*\[?(\d+)\]?/);
    const scoreBMatch = result.match(/## SCORE_B\s*\[?(\d+)\]?/);

    const scoreA = scoreAMatch ? parseInt(scoreAMatch[1]) : 5;
    const scoreB = scoreBMatch ? parseInt(scoreBMatch[1]) : 5;

    // Always derive winner from scores — lower score = safer = winner
    let winner;
    if (scoreA < scoreB) winner = "CONTRACT_A";
    else if (scoreB < scoreA) winner = "CONTRACT_B";
    else winner = "EQUAL";

    console.log(`ScoreA=${scoreA} ScoreB=${scoreB} Winner=${winner}`);

    return Response.json({ result, winner, scoreA, scoreB });

  } catch (error) {
    console.error("Error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}