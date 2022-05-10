import type { ConnInfo } from "../deps.ts";
export type Middleware = (
    ctx: Context,
    next: NextFunction,
) => Promise<RetHandler> | RetHandler;
export type Context = {
    connInfo: ConnInfo;
    request: Request;
};
export type NextFunction = () => Promise<Response> | Response;

export type RetHandler = Response | ResponseOptions;

export type ResponseOptions = Partial<
    & Omit<Response, "body">
    & ResponseInit
    & {
        // deno-lint-ignore no-explicit-any
        body?: null | BodyInit | Array<any> | Record<any, any>;
    }
>;
