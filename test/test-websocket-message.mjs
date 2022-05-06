import WebSocket, { createWebSocketStream } from "ws";
import HttpProxyAgent from "http-proxy-agent";

const proxy = "http://localhost:19001";

const agent = HttpProxyAgent(proxy);
const ws = new WebSocket("ws://websocket-echo.com/", { agent });
const duplex = createWebSocketStream(ws, { encoding: "utf8" });
duplex.on("data", (data) => {
    console.log(data.toString());
});
duplex.on("error", console.error);
duplex.on("end", () => {
    duplex.destroy();
    process.exit();
});
let timer = setInterval(() => {
    duplex.write(Math.random().toString());
}, 50);
setTimeout(() => {
    clearInterval(timer);
    duplex.end();
}, 1000);
