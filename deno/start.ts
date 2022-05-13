import { serveListener } from "../deps.ts";
import { handler } from "./handler.ts";

export async function start(port: number) {
    const servers = [
        Deno.listen({ port: port, hostname: "0.0.0.0" }),
        Deno.listen({ port: port, hostname: "::" }),
    ];
    return await Promise.all(servers.map(servestart));
}

async function servestart(server: Deno.Listener): Promise<void> {
    try {
        console.log(`Server listening `, server.addr);
        await serveListener(server, handler);
    } catch (error) {
        console.error(error);
        return servestart(server);
    }
}
