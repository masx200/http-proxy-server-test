import { query_dns } from "./query_dns.ts";
import { resolveDns } from "../node/resolveDns.ts";
import { dns_cache } from "./dns_cache_instance.ts";

export async function connect4or6_conn(
    hostname: string,
    connect_port: number,
): Promise<Deno.TcpConn> {
    // console.log(dns_cache);
    const ip = await resolveDns(hostname, query_dns, dns_cache);
    // console.log(hostname);
    // console.log(ip);
    if (!ip.A && !ip.AAAA) {
        throw Error("dns resolution failed:" + hostname);
    }
    const ps: Promise<Deno.TcpConn>[] = [];
    if (ip.AAAA) {
        const socket6 = Deno.connect({
            port: connect_port,
            hostname: ip.AAAA,
        });
        ps.push(socket6);
    }
    if (ip.A) {
        const socket4 = Deno.connect({
            port: connect_port,
            hostname: ip.A,
        });
        ps.push(socket4);
    }
    return Promise.any(ps);
}
