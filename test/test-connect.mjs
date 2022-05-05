import { request } from "http";

const options = {
    port: 19001,
    host: "127.0.0.1",
    method: "CONNECT",
    path: "www.baidu.com:80",
    headers: {
        connection: "keep-alive",
        "accept-encoding": "gzip, deflate, br",
    },
};

const req = request(options);
req.end();

req.on("connect", (res, socket, head) => {
    const { headers, statusCode, statusMessage } = res;
    console.log({ headers, statusCode, statusMessage });
    // console.log(res.headers);
    // console.log(res.statusCode);
    // console.log(socket);
    console.log(head.toString());
    // console.log("got connected!");
    res.on("data", (chunk) => {
        console.log(chunk.toString());
    });
    res.on("error", (e) => {
        console.error(e);
    });
    // Make a request over an HTTP tunnel
    socket.write(
        [
            "GET / HTTP/1.1",
            "Host: www.baidu.com:80",
            "Connection: close",
            "accept-encoding: gzip, deflate, br",
            "",
            "",
        ].join("\r\n"),
    );
    socket.on("data", (chunk) => {
        console.log(chunk.toString());
        process.exit();
    });
    socket.on("error", (e) => {
        console.error(e);
    });
    socket.on("end", () => {
        process.exit();
    });
});
