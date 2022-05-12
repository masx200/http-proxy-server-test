import { Context, error_handler, NextFunction, RetHandler } from "../deps.ts";

export async function process_proxy(
    ctx: Context,
    next: NextFunction,
): Promise<RetHandler> {
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
