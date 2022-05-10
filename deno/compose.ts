import { Middleware, RetHandler } from "./Middleware.ts";
import { ResponseBuilder } from "./ResponseBuilder.ts";
/** https://unpkg.com/koa-compose@4.1.0/index.js
 * https://unpkg.com/@types/koa-compose@3.2.5/index.d.ts
 */
export function compose(
    middleware: Array<Middleware>,
    responseBuilder: ResponseBuilder,
): Middleware {
    if (!Array.isArray(middleware)) {
        throw new TypeError("Middleware stack must be an array!");
    }
    for (const fn of middleware) {
        if (typeof fn !== "function") {
            throw new TypeError("Middleware must be composed of functions!");
        }
    }
    if (middleware.length === 0) {
        const result: Middleware = async (_ctx, next): Promise<Response> => {
            return await next();
        };
        return result;
    }
    const ComposedMiddleware: Middleware = async function (
        context,
        next,
    ): Promise<RetHandler> {
        let index = -1;
        return await dispatch(0);
        async function dispatch(i: number): Promise<RetHandler> {
            if (i <= index) throw new Error("next() called multiple times");

            index = i;
            const fn = middleware[i];
            if (i === middleware.length) return await next();
            if (!fn) throw new Error("next() is not function?");
            try {
                return await fn(context, async function () {
                    const response = await dispatch.bind(null, i + 1)();
                    if (response instanceof Response) {
                        return response;
                    } else {
                        return await responseBuilder(response);
                    }
                });
            } catch (err) {
                throw err;
            }
        }
    };
    return ComposedMiddleware;
}
