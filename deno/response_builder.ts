import { isPlainObject } from "../deps.ts";
import { EtagResponse } from "./EtagResponse.ts";
import { JsonResponse } from "./JsonResponse.ts";
import { RetHandler } from "./Middleware.ts";

export const response_builder = async function (
    response: RetHandler,
): Promise<Response> {
    const { body } = response;
    const { headers, status, statusText } = response;
    return response instanceof Response
        ? response
        : Array.isArray(body) || isPlainObject(body)
        ? await JsonResponse(response)
        : await EtagResponse({
            body: body as BodyInit | null | undefined,
            headers,
            status,
            statusText,
        });
};
