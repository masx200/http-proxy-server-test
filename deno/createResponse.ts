import { ResponseOptions } from "./ResponseOptions.ts";
export function createResponse(options: ResponseOptions): Response {
    if (options instanceof Response) {
        return options;
    }
    const { body, ...rest } = options;
    return new Response(body, rest);
}
