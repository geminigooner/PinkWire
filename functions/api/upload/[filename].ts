import { Env, jsonResponse, requireAuth } from "../../_shared/auth";

export const onRequestDelete: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const filename = params.filename as string;
  if (filename.includes("..") || filename.includes("/"))
    return jsonResponse({ error: "Invalid filename" }, 400);

  const existing = await env.MEDIA_BUCKET.head(filename);
  if (!existing) return jsonResponse({ error: "File not found" }, 404);

  await env.MEDIA_BUCKET.delete(filename);
  return jsonResponse({ success: true });
};
