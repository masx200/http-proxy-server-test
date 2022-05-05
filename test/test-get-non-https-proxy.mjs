import { request } from "http";

const options = {
    port: 19001,
    host: "127.0.0.1",
    method: "GET",
    path: "/",
    headers: {
        connection: "keep-alive",
        host: "ipv4.test-ipv6.com",
        "accept-encoding": "gzip, deflate, br",
    },
};

const req = request(options);
req.end();

req.on("response", (res) => {
    const { headers, statusCode, statusMessage } = res;
    console.log({ headers, statusCode, statusMessage });
    // console.log(res.headers);
    // console.log(res.statusCode);
    // console.log(socket);
    // console.log(head.toString());
    // console.log("got connected!");

    // Make a request over an HTTP tunnel
    // socket.write(
    //     "GET / HTTP/1.1\r\n" +
    //         "Host: www.baidu.com:80\r\n" +
    //         "Connection: close\r\n" +
    //         "\r\n"
    // );
    res.on("data", (chunk) => {
        console.log(chunk.toString());
        process.exit();
    });
    res.on("error", (e) => {
        console.error(e);
    });
    res.on("end", () => {
        process.exit();
    });
});
