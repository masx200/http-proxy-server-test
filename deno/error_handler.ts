import { STATUS_TEXT } from "../deps.ts";
import { ErrorHandler } from "./ErrorHandler.ts";
import { Context } from "./Middleware.ts";

// deno-lint-ignore require-await
export const error_handler: ErrorHandler = async (
    err: unknown,
    { request }: Context,
): Promise<Response> => {
    return new Response(
        `${STATUS_TEXT.get(500)}\n${request.url}` + "\n" + String(err),
        {
            status: 500,
        },
    );
};
