import type { ResponseOptions } from "./ResponseOptions.ts";
import type { ConnInfo } from "../deps.ts";
export type Middleware<Q = Context, S = RetHandler> = (
    rev: Q,
    next: NextFunction<S>,
) => Promise<S> | S;
export type Context = {
    connInfo: ConnInfo;
    request: Request;
};
export type NextFunction<S = RetHandler> = () => Promise<S> | S;
export type RetHandler = Response | ResponseOptions;
