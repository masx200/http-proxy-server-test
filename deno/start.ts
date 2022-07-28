import { on_connection } from "./on_connection.ts";
/*http connect / upgrade 不能用 标准库的http serve函数 */
export async function start(port: number) {
    const servers = [
        Deno.listen({ port: port, hostname: "0.0.0.0" }),
        Deno.listen({ port: port, hostname: "::" }),
    ];
    console.log(servers.map((a) => a.addr));
    return await Promise.all(
        servers.map(async (server) => {
            for await (const connection of server) {
                on_connection(connection).catch(console.error);
            }
        })
    );
}
