import { bodyToBuffer } from "./bodyToBuffer.ts";
import { createEtagHash } from "./createEtagHash.ts";

export async function EtagResponse(
    response: Partial<
        Omit<Response, "body"> & ResponseInit & { body?: BodyInit | null }
    >,
): Promise<Response> {
    const { body } = response;
    if (body instanceof ReadableStream || !body) {
        return new Response(body, response);
    } else {
        const buffer = await bodyToBuffer(body);
        const etag = await createEtagHash(buffer);

        const result = new Response(body, response);
        result.headers.set("ETag", etag);
        return result;
    }
}
