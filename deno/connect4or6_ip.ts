import { dns_cache } from "../deno/dns_cache_instance.ts";
import { connect_port_ip } from "./connect_port_ip.ts";
import { query_dns } from "./query_dns.ts";
import { resolveDns } from "../node/resolveDns.ts";

export async function connect4or6_ip(
    hostname: string,
    connect_port: number,
): Promise<string> {
    // console.log(dns_cache);
    const ip = await resolveDns(hostname, query_dns, dns_cache);
    // console.log(hostname);
    // console.log(ip);
    if (!ip.A && !ip.AAAA) {
        throw Error("dns resolution failed:" + hostname);
    }
    const ps: Promise<string>[] = [];
    if (ip.AAAA) {
        const socket = connect_port_ip(connect_port, ip.AAAA);
        ps.push(socket);
    }
    if (ip.A) {
        const socket = connect_port_ip(connect_port, ip.A);
        ps.push(socket);
    }
    return Promise.any(ps);
}
