import { Env, isAuthed, jsonResponse } from "../../_shared/auth";
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  return (await isAuthed(request, env))
    ? jsonResponse({ authenticated: true })
    : jsonResponse({ error: "Unauthorized" }, 401);
};
