import { ConnInfo, Handler } from "../deps.ts";
import { compose } from "./compose.ts";

import { ErrorHandler } from "./ErrorHandler.ts";
import { error_handler } from "./error_handler.ts";
import { Context, Middleware, RetHandler } from "./Middleware.ts";
import { NotFoundHandler } from "./NotFoundHandler.ts";
import { notfound_handler } from "./notfound_handler.ts";
import { ResponseBuilder } from "./ResponseBuilder.ts";
import { response_builder } from "./response_builder.ts";

export function createHandler(
    middleware: Middleware[],
    {
        notfoundHandler = notfound_handler,
        errorHandler = error_handler,
        responseBuilder = response_builder,
    }: {
        notfoundHandler?: NotFoundHandler;
        errorHandler?: ErrorHandler;
        responseBuilder?: ResponseBuilder;
    } = {},
): Handler {
    const composed = compose(middleware, responseBuilder);
    return async function (
        request: Request,
        connInfo: ConnInfo,
    ): Promise<Response> {
        const ctx: Context = { request, connInfo };
        let response: RetHandler;
        const next = () => notfoundHandler(ctx);
        try {
            response = await composed(ctx, next);
        } catch (error) {
            response = await errorHandler(error, ctx);
        }
        if (response instanceof Response) {
            return response;
        } else {
            return await responseBuilder(response);
        }
    };
}
