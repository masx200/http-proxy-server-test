import { process_start } from "./process_start.ts";

export async function handle_conn(conn: Deno.Conn): Promise<void> {
    try {
        const httpConn = Deno.serveHttp(conn);

        for await (const requestEvent of httpConn) {
            const response = await process_start(requestEvent.request);
            await requestEvent.respondWith(response).catch((error) => {
                console.error(error);
            });
        }
    } catch (error) {
        console.error(error);
    }
}
