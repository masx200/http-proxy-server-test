import { proxy } from "./proxy.ts";

export async function handle_conn(conn: Deno.Conn): Promise<void> {
    try {
        const httpConn = Deno.serveHttp(conn);

        for await (const requestEvent of httpConn) {
            const response = await proxy(requestEvent.request);

            await requestEvent.respondWith(response).catch((error) => {
                console.error(error);
            });
            console.log({
                url: requestEvent.request.url,
                status: response.status,
                headers: Object.fromEntries(response.headers),
            });
        }
    } catch (error) {
        console.error(error);
    }
}
