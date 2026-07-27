import { Env } from "../_shared/auth";

export const onRequestGet: PagesFunction<Env> = async ({ env, params }) => {
  const filename = params.filename as string;
  if (filename.includes("..") || filename.includes("/")) {
    return new Response("Invalid filename", { status: 400 });
  }

  const object = await env.MEDIA_BUCKET.get(filename);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000");

  return new Response(object.body, { headers });
};
