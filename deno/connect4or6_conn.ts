import { resolveDns4and6 } from "./resolveDns4and6.ts";

export async function connect4or6_conn(
    hostname: string,
    connect_port: number,
): Promise<Deno.TcpConn> {
    const ips = await resolveDns4and6(hostname);

    if (ips.length === 0) {
        throw Error("dns resolution failed:" + hostname);
    }
    const ps: Promise<Deno.TcpConn>[] = [];
    for (const ip of ips) {
        const socket = Deno.connect({
            port: connect_port,
            hostname: ip,
        });
        ps.push(socket);
    }

    return Promise.any(ps);
}
