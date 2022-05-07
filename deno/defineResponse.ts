import { ResponseOptions } from "./ResponseOptions.ts";
export function defineResponse(
    options: Partial<ResponseOptions> = {},
): ResponseOptions {
    const { status = 200, statusText, headers = new Headers(), body } = options;
    return { status, statusText, headers, body };
}
