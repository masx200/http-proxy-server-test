import { listening_port } from "./listening_port.ts";

export async function process_self(
    req: Request,
    next: () => Promise<Response> | Response,
): Promise<Response> {
    const { port, hostname } = new URL(req.url);
    const self_ips = Deno.networkInterfaces().map((v) => v.address);
    const ips_bracket = self_ips.map((a) => "[" + a + "]");
    if (
        Number(port) === listening_port &&
        (self_ips.includes(hostname) ||
            "localhost" === hostname ||
            ips_bracket.includes(hostname))
    ) {
        return new Response("404", { status: 404 });
    } else {
        return await next();
    }
}
