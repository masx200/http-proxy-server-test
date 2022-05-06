export async function process_websocket(
    req: Request,
    next: () => Promise<Response> | Response,
): Promise<Response> {
    const upgrade = req.headers.get("upgrade") || "";
    const connection = req.headers.get("connection") || "";
    const Sec_WebSocket_Protocol = req.headers
        .get("Sec-WebSocket-Protocol")
        ?.replaceAll(" ", "")
        .split(",");
    if (
        connection.toLowerCase() === "Upgrade".toLowerCase() &&
        upgrade.toLowerCase() === "websocket".toLowerCase()
    ) {
        try {
            const { response, socket } = Deno.upgradeWebSocket(req);
            console.log(socket);
            socket.addEventListener("error", (e) => {
                console.log(e);
            });
            socket.addEventListener("close", (e) => {
                console.log(e);
            });
            socket.addEventListener("message", (e) => {
                console.log(e);
                client_socket.send(e.data);
            });
            socket.addEventListener("open", (e) => {
                console.log(e);
            });

            const client_socket = new WebSocket(
                Object.assign(new URL(req.url), { protocol: "ws:" }).toString(),
                Sec_WebSocket_Protocol,
            );
            console.log(client_socket);
            client_socket.addEventListener("error", (e) => {
                console.log(e);
            });
            client_socket.addEventListener("close", (e) => {
                console.log(e);
                socket.close(e.code, e.reason);
            });
            client_socket.addEventListener("message", (e) => {
                console.log(e);
                socket.send(e.data);
            });
            client_socket.addEventListener("open", (e) => {
                console.log(e);
            });

            return response;
        } catch (err) {
            console.error(err);
            return new Response(String(err), { status: 400 });
        }
    } else {
        return await next();
    }
}
