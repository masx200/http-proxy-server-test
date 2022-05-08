import { dns_cache } from "../deno/dns_cache_instance.ts";
import { query_dns } from "./query_dns.ts";
import { resolveDns } from "../node/resolveDns.ts";

export async function resolveDns4and6(hostname: string): Promise<string[]> {
    try {
        const ip = await resolveDns(hostname, query_dns, dns_cache);
        return [ip.A, ip.AAAA].filter(Boolean) as string[];
    } catch (error) {
        console.error(error);
        return (
            await Promise.all([
                Deno.resolveDns(hostname, "AAAA", {
                    nameServer: { ipAddr: "180.76.76.76", port: 53 },
                }),
                Deno.resolveDns(hostname, "A", {
                    nameServer: { ipAddr: "180.76.76.76", port: 53 },
                }),
            ])
        ).flat();
    }
}
