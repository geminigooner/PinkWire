import { Env, jsonResponse, requireAuth } from "../../_shared/auth";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"];
const MAX_SIZE = 10 * 1024 * 1024;

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return [...arr].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const form = await request.formData();
  const file = form.get("file");

  if (!file || !(file instanceof File)) return jsonResponse({ error: "No file uploaded." }, 400);
  if (!ALLOWED_MIME_TYPES.includes(file.type))
    return jsonResponse({ error: "Unsupported file type. Please upload a valid image." }, 400);
  if (file.size > MAX_SIZE) return jsonResponse({ error: "File too large (10MB max)." }, 400);

  const ext = file.name.includes(".") ? file.name.slice(file.name.lastIndexOf(".")) : "";
  const filename = `media-${randomHex(8)}${ext}`;

  await env.MEDIA_BUCKET.put(filename, await file.arrayBuffer(), {
    httpMetadata: { contentType: file.type },
  });

  return jsonResponse({ url: `/uploads/${filename}`, filename, mimeType: file.type, size: file.size });
};
