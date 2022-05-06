import net from "net";
import fs from "fs";
import process from "process";
const raw_data = await fs.promises.readFile(
    new URL("./websocket-test.http", import.meta.url),
    {
        encoding: "utf-8",
    },
);
const socket = net.connect({ port: 19001, host: "localhost" }, () => {
    socket.write(raw_data);
    socket.end();
});
socket.on("error", console.error);
socket.on("data", (data) => console.log(data.toString()));
socket.on("end", () => {
    process.exit();
});
