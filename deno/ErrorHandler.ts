import { Context } from "./Middleware.ts";

export interface ErrorHandler {
    (error: unknown, ctx: Context):
        | Promise<Response>
        | Response;
}
