import { serveListener } from "https://deno.land/std@0.138.0/http/server.ts";
import { handler } from "./handler.ts";

export async function start(port: number) {
    const servers = [
        Deno.listen({ port: port, hostname: "0.0.0.0" }),
        Deno.listen({ port: port, hostname: "::" }),
    ];
    return await Promise.all(
        servers.map(async (server) => {
            console.log(`Server listening `, server.addr);
            await serveListener(server, handler);
        }),
    );
}
