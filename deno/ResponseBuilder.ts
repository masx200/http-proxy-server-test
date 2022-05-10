import { RetHandler } from "./Middleware.ts";

export type ResponseBuilder = (
    response: RetHandler,
) => Promise<Response> | Response;
