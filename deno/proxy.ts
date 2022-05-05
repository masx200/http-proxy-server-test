import { process_request } from "./process_request.ts";

export async function proxy(req: Request): Promise<Response> {
    const { url, method, headers } = req;
    console.log({ url, method, headers: Object.fromEntries(headers) });

    try {
        return await process_request(req);
    } catch (error) {
        console.error(error);
        return new Response(String(error), { status: 500 });
    }
}
