import { Env, getAdminToken, jsonResponse } from "../../_shared/auth";

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { password } = (await request.json()) as { password?: string };
  const expected = env.ADMIN_SECRET;

  if (password === expected && expected) {
    return jsonResponse({ token: await getAdminToken(env) });
  }

  return jsonResponse({ error: "Unauthorized" }, 401);
};
