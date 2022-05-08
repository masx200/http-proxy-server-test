import { error_handler } from "./error_handler.ts";
import { Context, NextFunction, RetHandler } from "./Middleware.ts";

export async function process_proxy(
    ctx: Context,
    next: NextFunction,
): Promise<RetHandler> {
    const { request } = ctx;
    const req = request;
    try {
        return await next();
    } catch (error) {
        if (error instanceof Error) {
            console.error(String(error), error.stack);
        } else {
            console.error(error);
        }

        return error_handler(req, error);
    }
}
