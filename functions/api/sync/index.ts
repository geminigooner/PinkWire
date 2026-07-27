import { Env, jsonResponse, requireAuth } from "../../_shared/auth";

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const { results } = await env.DB.prepare("SELECT store_name, data FROM sync_data")
    .all<{ store_name: string; data: string }>();

  const out: Record<string, unknown> = {};
  for (const row of results) {
    try { out[row.store_name] = JSON.parse(row.data); }
    catch { out[row.store_name] = row.data; }
  }
  return jsonResponse(out);
};
