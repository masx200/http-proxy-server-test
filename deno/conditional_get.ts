import { Context, NextFunction } from "./Middleware.ts";
import fresh from "https://cdn.skypack.dev/fresh@0.5.2?dts";
export async function conditional_get(ctx: Context, next: NextFunction) {
    const response = await next();
    const { request } = ctx;
    const reqHeaders = Object.fromEntries(request.headers);
    const resHeaders = Object.fromEntries(response.headers);
    const s = response.status;
    if ((s >= 200 && s < 300) || 304 === s) {
        if (
            ["GET", "HEAD"].includes(request.method) &&
            ((response.headers.get("etag") &&
                response.headers.get("etag") ===
                    request.headers.get("if-none-match")) ||
                fresh(reqHeaders, resHeaders))
        ) {
            const { headers } = response;
            return new Response(null, { headers, status: 304 });
        }
    }

    return response;
}
