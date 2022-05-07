import { ResponseOptions } from "./ResponseOptions.ts";

export type Middleware<Q = Request, S = RetHandler> = (
    rev: Q,
    next: NextFunction<S>,
) => Promise<S> | S;

export type NextFunction<S = RetHandler> = () => Promise<S> | S;
export type RetHandler = Response | ResponseOptions;
