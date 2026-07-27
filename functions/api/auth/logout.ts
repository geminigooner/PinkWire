import { jsonResponse } from "../../_shared/auth";
export const onRequestPost: PagesFunction = async () => jsonResponse({ success: true });
