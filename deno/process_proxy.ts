import {
    Context,
    error_handler,
    NextFunction,
    RetHandler,
} from "https://deno.land/x/masx200_deno_http_middleware@1.0.6/mod.ts";

export async function process_proxy(
    ctx: Context,
    next: NextFunction,
): Promise<RetHandler> {
    const { request } = ctx;

    try {
        return await next();
    } catch (error) {
        if (error instanceof Error) {
            console.error(String(error), error.stack);
        } else {
            console.error(error);
        }

        return error_handler(error, ctx);
    }
}
