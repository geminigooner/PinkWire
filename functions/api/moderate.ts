import { Env, jsonResponse } from "../_shared/auth";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { message, displayName } = (await request.json()) as {
      message?: string; displayName?: string;
    };
    if (!message) return jsonResponse({ error: "Message is required" }, 400);

    const prompt = `Moderate the following guestbook entry.
Name: ${displayName}
Message: ${message}

Rules:
- Optimize for maintaining a psychologically safe, welcoming community.
- Allow swearing, joking, criticism, disagreement, slang, and weirdness.
- Reject or hold for review ONLY if it contains harassment, threats, hate speech, discriminatory insults, doxxing, sexual exploitation, spam, malicious links, or targeted abuse.

Output ONLY a JSON object with two fields:
- "decision": one of "Publish", "Review", "Reject"
- "reason": A short machine-readable explanation of the decision.`;

    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: { decision: { type: "STRING" }, reason: { type: "STRING" } },
              required: ["decision", "reason"],
            },
          },
        }),
      }
    );

    const geminiData = await geminiResp.json<any>();
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
    const result = JSON.parse(text);

    if (!["Publish", "Review", "Reject"].includes(result.decision)) result.decision = "Review";
    return jsonResponse(result);
  } catch (error) {
    console.error("Moderation error:", error);
    return jsonResponse({
      error: "Moderation service unavailable",
      decision: "Review",
      reason: "Error contacting moderation service",
    }, 500);
  }
};
