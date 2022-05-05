import {
    copy,
    writeAll,
} from "https://deno.land/std@0.137.0/streams/conversion.ts";
import { isIP } from "https://deno.land/std@0.137.0/node/internal/net.ts";
import { listening_port } from "./listening_port.ts";
import { connect4or6_conn } from "./connect4or6_conn.ts";
import { connect4or6_ip } from "./connect4or6_ip.ts";
import { http_to_https } from "./http_to_https.ts";
export async function process_request(req: Request): Promise<Response> {
    //debugger;
    const { port, hostname } = new URL(req.url);
    const self_ips = Deno.networkInterfaces().map((v) => v.address);
    if (
        Number(port) === listening_port &&
        (self_ips.includes(hostname) || "localhost" === hostname)
    ) {
        return new Response("404", { status: 404 });
    }
    if (req.method !== "CONNECT") {
        if (!port) {
            const url = new URL(req.url);
            url.protocol = "https:";
            // console.log(http_to_https);
            if (http_to_https.has(hostname)) {
                return Response.redirect(String(url), 308);
            } else {
                try {
                    const c = await Deno.connectTls({ port: 443, hostname });

                    c.close();
                    http_to_https.add(hostname);
                    return Response.redirect(String(url), 308);
                } catch (error) {
                    console.error(error);
                }
            }
        }
        const ip = isIP(hostname)
            ? hostname
            : await connect4or6_ip(hostname, port ? Number(port) : 80);
        const client = Deno.createHttpClient({
            proxy: { url: `http://${ip}:${port}` },
        });
        try {
            const response = await fetch(req.url, {
                redirect: "manual",
                body: req.body,
                headers: req.headers,
                method: req.method,
                client,
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            client.close();
        }
    }

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
