export interface Env {
  ADMIN_SECRET: string;
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
  GEMINI_API_KEY: string;
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return [...new Uint8Array(signature)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function getAdminToken(env: Env): Promise<string> {
  const secret = env.ADMIN_SECRET || "dev_secret_do_not_use_in_prod";
  return hmacSha256Hex(secret, "amanda-admin-session");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

export async function isAuthed(request: Request, env: Env): Promise<boolean> {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.split(" ")[1];
  if (!token) return false;
  return safeEqual(token, await getAdminToken(env));
}

export function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });
}

export async function requireAuth(request: Request, env: Env): Promise<Response | null> {
  return (await isAuthed(request, env)) ? null : jsonResponse({ error: "Unauthorized" }, 401);
}
