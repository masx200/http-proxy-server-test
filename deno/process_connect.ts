import {
    Context,
    copy,
    isIP,
    NextFunction,
    RetHandler,
    STATUS_TEXT,
    writeAll,
} from "../deps.ts";
import { connect4or6_conn } from "./connect4or6_conn.ts";

export async function process_connect(
    { request: req }: Context,
    next: NextFunction
): Promise<RetHandler> {
    if (req.method !== "CONNECT") {
        return await next();
    }
    //debugger;
    try {
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
                    await Promise.race([
                        copy(conn, socket),
                        copy(socket, conn),
                    ]);
                } catch (error) {
                    console.error(error);
                } finally {
                    socket.close();
                    conn.close();
                }
            })
            .catch(console.error);

        return new Response(null, { status: 200 });
    } catch (e) {
        console.error(String(e));
        return { status: 503, body: STATUS_TEXT[503] };
    }
}
