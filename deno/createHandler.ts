import { ConnInfo, Handler } from "../deps.ts";
import { compose } from "./compose.ts";

import { ErrorHandler } from "./ErrorHandler.ts";
import { Context, Middleware, RetHandler } from "./Middleware.ts";
import { NotFoundHandler } from "./NotFoundHandler.ts";

export function createHandler(
    middleware: Middleware[],
    notfound: NotFoundHandler = () => new Response(null, { status: 404 }),
    error_handler: ErrorHandler = () => new Response(null, { status: 500 }),
): Handler {
    const composed = compose(middleware);
    return async function (
        request: Request,
        connInfo: ConnInfo,
    ): Promise<Response> {
        const ctx: Context = { request, connInfo };
        let response: RetHandler;
        try {
            const next = () => notfound(request);
            response = await composed(ctx, next);
        } catch (error) {
            response = await error_handler(request, error);
        }
        if (response instanceof Response) {
            return response;
        } else {
            return await error_handler(request, TypeError("Response expected"));
        }
    };
}
