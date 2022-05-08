import { process_start } from "./process_start.ts";

export async function handle_conn(conn: Deno.Conn): Promise<void> {
    const { localAddr, remoteAddr } = conn;
    try {
        const httpConn = Deno.serveHttp(conn);

        for await (const requestEvent of httpConn) {
            let response: Response;
            try {
                response = await process_start({
                    request: requestEvent.request,
                    connInfo: { localAddr, remoteAddr },
                });
            } catch (error) {
                response = new Response(String(error), { status: 500 });
            }

            await requestEvent.respondWith(response).catch((error) => {
                console.error(error);
            });
        }
    } catch (error) {
        console.error(error);
    }
}
