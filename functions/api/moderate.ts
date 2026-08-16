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

Rules for rejecting (auto-decline):
- ANY insults or offensive language directed at the user (Amanda) or anyone else (e.g. calling them fat, dumb, etc).
- Any racism or hate speech.
- Anything sexual or sexually explicit.
- Any LARP (Live Action Role-Playing).
- Any creepy or overly familiar comments like "HEY BEAUTIFUL" directed at the user.
- Spam or malicious links.
- If it violates ANY of these, output "Reject".

Rules for holding for review:
- If you are unsure if it's offensive but it seems borderline, or it might piss the user off but isn't explicitly banned above.
- If it's safe but slightly weird.
- Output "Review".

Rules for publishing:
- Friendly, normal guestbook notes.
- Output "Publish".

Output ONLY a JSON object with two fields:
- "decision": one of "Publish", "Review", "Reject"
- "reason": A short machine-readable explanation of the decision.`;

    const geminiResp = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${env.GEMINI_API_KEY}`,
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
