import { handle_conn } from "./handle_conn.ts";

export async function start(port: number) {
    const servers = [
        Deno.listen({ port: port, hostname: "0.0.0.0" }),
        Deno.listen({ port: port, hostname: "::" }),
    ];
    return await Promise.all(
        servers.map(async (server) => {
            console.log(`Server listening `, server.addr);
            for await (const conn of server) {
                handle_conn(conn);
            }
        }),
    );
}
