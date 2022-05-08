import { error_handler } from "./error_handler.ts";
import { Context, NextFunction, RetHandler } from "./Middleware.ts";
export async function process_websocket(
    { request: req }: Context,
    next: NextFunction,
): Promise<RetHandler> {
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
                if (e.code === 1000 || (3000 <= e.code && e.code <= 4999)) {
                    client_socket.close(e.code, e.reason);
                } else {
                    client_socket.close();
                }
            });
            socket.addEventListener("message", (e) => {
                console.log(e);
                if (client_socket.readyState !== WebSocket.OPEN) {
                    client_socket.addEventListener(
                        "open",
                        () => {
                            client_socket.send(e.data);
                        },
                        {
                            once: true,
                        },
                    );
                } else {
                    client_socket.send(e.data);
                }
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

                if (e.code === 1000 || (3000 <= e.code && e.code <= 4999)) {
                    socket.close(e.code, e.reason);
                } else {
                    socket.close();
                }
            });
            client_socket.addEventListener("message", (e) => {
                console.log(e);

                if (socket.readyState !== WebSocket.OPEN) {
                    socket.addEventListener(
                        "open",
                        () => {
                            socket.send(e.data);
                        },
                        {
                            once: true,
                        },
                    );
                } else {
                    socket.send(e.data);
                }
            });
            client_socket.addEventListener("open", (e) => {
                console.log(e);
            });

            return response;
        } catch (err) {
            console.error(err);
            return error_handler(req,err)
        }
    } else {
        return await next();
    }
}
