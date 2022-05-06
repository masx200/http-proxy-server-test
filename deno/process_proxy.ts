import { process_connect } from "./process_connect.ts";
import { process_request } from "./process_request.ts";
import { process_self } from "./process_self.ts";
import { process_websocket } from "./process_websocket.ts";

export async function process_proxy(
    req: Request,
    next: () => Promise<Response> | Response,
): Promise<Response> {
    // const { url, method, headers } = req;
    // console.log({ url, method, headers: Object.fromEntries(headers) });

    try {
        return await process_self(
            req,
            () =>
                process_websocket(
                    req,
                    () =>
                        process_request(req, () => process_connect(req, next)),
                ),
        );
    } catch (error) {
        console.error(error);
        return new Response(String(error), { status: 500 });
    }
}
