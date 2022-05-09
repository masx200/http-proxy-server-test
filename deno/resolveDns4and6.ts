import { dns_cache } from "../deno/dns_cache_instance.ts";
import { query_dns } from "./query_dns.ts";
import { resolveDns } from "../node/resolveDns.ts";

export async function resolveDns4and6(hostname: string): Promise<string[]> {
    const cached = dns_cache.get(hostname);
    if (cached) {
        return cached;
    }
    try {
        const ip = await resolveDns(hostname, query_dns);
        const ips = [ip.A, ip.AAAA].filter(Boolean) as string[];
        save_ips_cache(ips, hostname);
        return ips;
    } catch (error) {
        console.error(error);
        const results = (
            await Promise.allSettled([
                Deno.resolveDns(hostname, "AAAA", {
                    nameServer: { ipAddr: "223.5.5.5", port: 53 },
                }),
                Deno.resolveDns(hostname, "A", {
                    nameServer: { ipAddr: "223.5.5.5", port: 53 },
                }),
            ])
        ).filter((r) => r.status === "fulfilled") as Array<
            PromiseFulfilledResult<string[]>
        >;
        const ips = results.map((r) => r.value).flat();
        save_ips_cache(ips, hostname);
        return ips;
    }
}

function save_ips_cache(ips: string[], hostname: string) {
    ips.length && dns_cache.set(hostname, ips);
}
