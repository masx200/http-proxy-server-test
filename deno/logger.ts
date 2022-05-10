import { Context, NextFunction, RetHandler } from "./Middleware.ts";

export const logger = async function (
    ctx: Context,
    next: NextFunction,
): Promise<RetHandler> {
    //console.log(ctx.connInfo);
    const { request } = ctx;
    const { url, method, headers } = request;
    console.log({...ctx.connInfo, url, method, headers: Object.fromEntries(headers) });

    const response = await next();

    console.log({
        url: request.url,
        status: response.status,
        headers: Object.fromEntries(response.headers),
    });
    return response;
};
