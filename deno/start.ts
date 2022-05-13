import { serve } from "../deps.ts";
import { handler } from "./handler.ts";

export async function start(port: number) {
    const servers = [
        { port: port, hostname: "0.0.0.0" },
        { port: port, hostname: "::" },
    ];
    return await Promise.all(servers.map((server) => serve(handler, server)));
}
