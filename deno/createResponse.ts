import { ResponseOptions } from "./ResponseOptions.ts";
export function createResponse(options: ResponseOptions): Response {
    const { body, ...rest } = options;
    return new Response(body, rest);
}
