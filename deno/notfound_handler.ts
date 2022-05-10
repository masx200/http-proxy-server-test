import { STATUS_TEXT } from "../deps.ts";
import { Context } from "./Middleware.ts";
import { NotFoundHandler } from "./NotFoundHandler.ts";

// deno-lint-ignore require-await
export const notfound_handler: NotFoundHandler = async (
    { request }: Context,
): Promise<Response> => {
    return new Response(`${STATUS_TEXT.get(404)}\n${request.url}`, {
        status: 404,
    });
};
