import { process_proxy } from "./process_proxy.ts";

export async function process_start(request: Request) {
    const { url, method, headers } = request;
    console.log({ url, method, headers: Object.fromEntries(headers) });

    const response = await process_proxy(
        request,
        () => new Response("404", { status: 404 }),
    );

    console.log({
        url: request.url,
        status: response.status,
        headers: Object.fromEntries(response.headers),
    });
    return response;
}
