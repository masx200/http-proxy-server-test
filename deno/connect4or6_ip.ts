import { connect_port_ip } from "./connect_port_ip.ts";
import { resolveDns4and6 } from "./resolveDns4and6.ts";
export async function connect4or6_ip(
    hostname: string,
    connect_port: number,
): Promise<string> {
    const ips = await resolveDns4and6(hostname);

    if (ips.length === 0) {
        throw Error("dns resolution failed:" + hostname);
    }
    const ps: Promise<string>[] = [];
    for (const ip of ips) {
        const socket = connect_port_ip(connect_port, ip);
        ps.push(socket);
    }

    return Promise.any(ps);
}
