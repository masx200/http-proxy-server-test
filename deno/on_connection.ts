import { handler } from "./handler.ts";

export async function on_connection(connection: Deno.Conn) {
    const { localAddr, remoteAddr } = connection;
    const connInfo = { localAddr, remoteAddr };
    for await (const requestEvent of Deno.serveHttp(connection)) {
        await requestEvent.respondWith(handler(requestEvent.request, connInfo));
    }
}
