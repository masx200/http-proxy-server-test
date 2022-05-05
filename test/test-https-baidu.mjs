import { ProxyAgent, request } from "undici";

const proxyAgent = new ProxyAgent("http://127.0.0.1:19001");

const {
    statusCode,
    body,
    headers,
} = await request("https://www.baidu.com", { dispatcher: proxyAgent });

console.log("response received", statusCode); // response received 200
console.log(headers);
for await (const data of body) {
    console.log("data", data.toString("utf8")); // data foo
}
