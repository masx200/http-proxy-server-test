export async function process_websocket(
    req: Request,
    next: () => Promise<Response> | Response,
): Promise<Response> {
    const upgrade = req.headers.get("upgrade") || "";
    const connection = req.headers.get("connection") || "";
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
            });
            socket.addEventListener("open", (e) => {
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
