import { Middleware } from "./Middleware.ts";
/** https://unpkg.com/koa-compose@4.1.0/index.js
 * https://unpkg.com/@types/koa-compose@3.2.5/index.d.ts
 */
export function compose<Q, S>(
    middleware: Array<Middleware<Q, S>>,
): Middleware<Q, S> {
    if (!Array.isArray(middleware)) {
        throw new TypeError("Middleware stack must be an array!");
    }
    for (const fn of middleware) {
        if (typeof fn !== "function") {
            throw new TypeError("Middleware must be composed of functions!");
        }
    }
    if (middleware.length === 0) {
        const result: Middleware<Q, S> = async (_ctx, next): Promise<S> => {
            return await next();
        };
        return result;
    }
    const ComposedMiddleware: Middleware<Q, S> = async function (
        context,
        next,
    ): Promise<S> {
        let index = -1;
        return await dispatch(0);
        async function dispatch(i: number): Promise<S> {
            if (i <= index) throw new Error("next() called multiple times");

            index = i;
            const fn = middleware[i];
            if (i === middleware.length) return await next();
            if (!fn) throw new Error("next() is not function?");
            try {
                return await fn(context, dispatch.bind(null, i + 1));
            } catch (err) {
                throw err;
            }
        }
    };
    return ComposedMiddleware;
}
