import { handler } from "./handler.ts";
import { Context } from "./Middleware.ts";
export async function process_start(ctx: Context): Promise<Response> {
    const { request, connInfo } = ctx;
    const response = await handler(request, connInfo);
    return response;
}
