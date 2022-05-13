import { handler } from "./handler.ts";

export async function on_connection(connection: Deno.Conn) {
    const { localAddr, remoteAddr } = connection;
    const connInfo = { localAddr, remoteAddr };
    for await (const requestEvent of Deno.serveHttp(connection)) {
        const response = await Promise.resolve(
            handler(requestEvent.request, connInfo)
        ).catch(() => new Response(null, { status: 500 }));
        await requestEvent.respondWith(response);
    }
}
