import { onRequestPost as loginPost } from "../functions/api/auth/login";
import { onRequestPost as logoutPost } from "../functions/api/auth/logout";
import { onRequestGet as verifyGet } from "../functions/api/auth/verify";
import { onRequestPost as moderatePost } from "../functions/api/moderate";
import { onRequestGet as syncAllGet } from "../functions/api/sync/index";
import { onRequestGet as syncGet, onRequestPost as syncPost } from "../functions/api/sync/[storeName]";
import { onRequestPost as uploadPost } from "../functions/api/upload/index";
import { onRequestDelete as uploadDelete } from "../functions/api/upload/[filename]";
import { onRequestGet as serveUpload } from "../functions/uploads/[filename]";

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;
    const call = (fn: any, params: any = {}) => fn({ request, env, params, ctx });

    if (path === "/api/auth/login" && method === "POST") return call(loginPost);
    if (path === "/api/auth/logout" && method === "POST") return call(logoutPost);
    if (path === "/api/auth/verify" && method === "GET") return call(verifyGet);
    if (path === "/api/moderate" && method === "POST") return call(moderatePost);

    if (path === "/api/sync" && method === "GET") return call(syncAllGet);

    const syncMatch = path.match(/^\/api\/sync\/([^/]+)$/);
    if (syncMatch) {
      const params = { storeName: decodeURIComponent(syncMatch[1]) };
      if (method === "GET") return call(syncGet, params);
      if (method === "POST") return call(syncPost, params);
    }

    if (path === "/api/upload" && method === "POST") return call(uploadPost);

    const uploadMatch = path.match(/^\/api\/upload\/([^/]+)$/);
    if (uploadMatch && method === "DELETE") {
      return call(uploadDelete, { filename: decodeURIComponent(uploadMatch[1]) });
    }

    const serveMatch = path.match(/^\/uploads\/([^/]+)$/);
    if (serveMatch && method === "GET") {
      return call(serveUpload, { filename: decodeURIComponent(serveMatch[1]) });
    }

    return env.ASSETS.fetch(request);
  },
};
