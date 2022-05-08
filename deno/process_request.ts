import { isIP } from "../deps.ts";
import { connect4or6_ip } from "./connect4or6_ip.ts";
import { http_to_https } from "./http_to_https.ts";
export async function process_request(
    req: Request,
    next: () => Promise<Response> | Response,
): Promise<Response> {
    //debugger;
    const { port, hostname } = new URL(req.url);

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
                    await c.handshake();
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
    } else {
        return await next();
    }
}
