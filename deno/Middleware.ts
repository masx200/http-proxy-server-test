import { ResponseOptions } from "./ResponseOptions.ts";

export interface Middleware {
    (rev: Request, next: NextFunction): RetHandler;
}
export type NextFunction = () => RetHandler;
export type RetHandler =
    | Promise<Response | ResponseOptions>
    | Response
    | ResponseOptions;
