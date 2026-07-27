import { Env, jsonResponse, requireAuth } from "../../_shared/auth";

export const onRequestPost: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const storeName = params.storeName as string;
  const body = await request.json();

  await env.DB.prepare(
    `INSERT INTO sync_data (store_name, data, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(store_name) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`
  ).bind(storeName, JSON.stringify(body), Date.now()).run();

  return jsonResponse({ success: true });
};

export const onRequestGet: PagesFunction<Env> = async ({ request, env, params }) => {
  const authError = await requireAuth(request, env);
  if (authError) return authError;

  const storeName = params.storeName as string;
  const row = await env.DB.prepare("SELECT data FROM sync_data WHERE store_name = ?")
    .bind(storeName).first<{ data: string }>();

  if (!row) return jsonResponse({ error: "No sync data found" }, 404);
  return jsonResponse(JSON.parse(row.data));
};
