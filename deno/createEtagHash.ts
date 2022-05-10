import { encode } from "../deps.ts";

export async function createEtagHash(
    message: string | Uint8Array,
): Promise<string> {
    const algorithm = "sha-1";
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const msgUint8 = message instanceof Uint8Array
        ? message
        : encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest(algorithm, msgUint8);
    return msgUint8.length.toString(16) + "-" +
        decoder.decode(encode(new Uint8Array(hashBuffer)));
}
