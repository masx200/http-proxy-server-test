import { Context } from "./Middleware.ts";

export interface NotFoundHandler {
    (ctx: Context): Promise<Response> | Response;
}
