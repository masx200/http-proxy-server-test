import { listening_port } from "./listening_port.ts";
import { Context, NextFunction, RetHandler } from "./Middleware.ts";
import { notfound_handler } from "./notfound_handler.ts";

export async function process_self(
    { request: req }: Context,
    next: NextFunction
): Promise<RetHandler> {
    const { port, hostname } = new URL(req.url);
    const self_ips = Deno.networkInterfaces().map((v) => v.address);
    const ips_bracket = self_ips.map((a) => "[" + a + "]");
    if (
        Number(port) === listening_port &&
        (self_ips.includes(hostname) ||
            "localhost" === hostname ||
            ips_bracket.includes(hostname))
    ) {
        return notfound_handler(req);
    } else {
        return await next();
    }
}
