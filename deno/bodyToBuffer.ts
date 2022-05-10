export async function bodyToBuffer(
    body: Exclude<BodyInit, ReadableStream>,
): Promise<Uint8Array> {
    return new Uint8Array(await new Response(body).arrayBuffer());
}
