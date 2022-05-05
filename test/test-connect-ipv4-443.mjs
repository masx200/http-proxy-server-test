import { request } from "http";

const options = {
    port: 19001,
    host: "127.0.0.1",
    method: "CONNECT",
    path: "ipv4.test-ipv6.com:443",
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
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Encoding: gzip, deflate, br",
            "Accept-Language: zh-CN,zh;q=0.9",
            "Cache-Control: no-cache",
            "Connection: keep-alive",
            "Host: ipv4.test-ipv6.com",
            "Pragma: no-cache",
            "Sec-Fetch-Dest: document",
            "Sec-Fetch-Mode: navigate",
            "Sec-Fetch-Site: none",
            "Sec-Fetch-User: ?1",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.41 Safari/537.36",
            'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="101", "Google Chrome";v="101"',
            "sec-ch-ua-mobile: ?0",
            'sec-ch-ua-platform: "Windows"',
            "",
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
