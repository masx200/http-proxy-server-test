import { copy, isIP, writeAll } from "../deps.ts";
import { connect4or6_conn } from "./connect4or6_conn.ts";
import { Context, NextFunction, RetHandler } from "./Middleware.ts";

export async function process_connect(
    { request: req }: Context,
    next: NextFunction,
): Promise<RetHandler> {
    if (req.method !== "CONNECT") {
        return await next();
    }
    //debugger;
    const { port, hostname } = new URL(req.url);

    const connect_port = port ? Number(port) : 80;
    const socket: Deno.TcpConn = isIP(hostname)
        ? await Deno.connect({
            port: connect_port,
            hostname,
        })
        : await connect4or6_conn(hostname, connect_port);

    Deno.upgradeHttp(req)
        .then(async ([conn, firstPacket]) => {
            try {
                await writeAll(conn, firstPacket);
                await Promise.race([copy(conn, socket), copy(socket, conn)]);
            } catch (error) {
                console.error(error);
            } finally {
                socket.close();
                conn.close();
            }
        })
        .catch(console.error);

    return new Response("200", { status: 200 });
}
