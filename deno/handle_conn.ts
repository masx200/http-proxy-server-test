import { process_start } from "./process_start.ts";
import { error_handler } from "./error_handler.ts";
export async function handle_conn(conn: Deno.Conn): Promise<void> {
    const { localAddr, remoteAddr } = conn;
    try {
        const httpConn = Deno.serveHttp(conn);

        for await (const requestEvent of httpConn) {
            const { request } = requestEvent;
            let response: Response;
            const ctx = {
                request: request,
                connInfo: { localAddr, remoteAddr },
            };
            try {
                response = await process_start(ctx);
            } catch (error) {
                response = await error_handler(error, ctx);
            }

            await requestEvent.respondWith(response).catch((error) => {
                console.error(error);
            });
        }
    } catch (error) {
        console.error(error);
    }
}
