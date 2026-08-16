import { Env, jsonResponse } from "../../_shared/auth";

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  const row = await env.DB.prepare(
    "SELECT data FROM sync_data WHERE store_name = ?"
  ).bind("desktop").first<{ data: string }>();

  if (!row) return jsonResponse({});

  try {
    const parsed = JSON.parse(row.data);
    const s = parsed?.state ?? parsed;
    return jsonResponse({
      wallpaper: s.wallpaper ?? null,
      wallpaperFit: s.wallpaperFit ?? "cover",
      wallpaperBlur: s.wallpaperBlur ?? false,
    });
  } catch {
    return jsonResponse({});
  }
};
