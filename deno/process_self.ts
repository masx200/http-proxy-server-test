import {
    Context,
    NextFunction,
    notfound_handler,
    RetHandler,
} from "../deps.ts";

export async function process_self(
    ctx: Context,
    next: NextFunction
): Promise<RetHandler> {
    const { request: req, connInfo } = ctx;
    const { port, hostname } = new URL(req.url);
    const self_ips = Deno.networkInterfaces().map((v) => v.address);
    const ips_bracket = self_ips.map((a) => "[" + a + "]");
    if (
        connInfo.localAddr.transport === "tcp" &&
        Number(port) === connInfo.localAddr.port &&
        (self_ips.includes(hostname) ||
            "localhost" === hostname ||
            ips_bracket.includes(hostname))
    ) {
        return await notfound_handler(ctx);
    } else {
        return await next();
    }
}
