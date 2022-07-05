// import type { DNS_Cache } from "../deno/DNS_Cache_type.ts";
import type { IAnswer } from "./IAnswer.ts";

export async function resolveDns(
    name: string,
    query_dns: (name: string) => Promise<IAnswer[]>
    // dns_cache: DNS_Cache
): Promise<{ A?: string; AAAA?: string }> {
    // console.log(dns_cache);
    // const ip = dns_cache.get(name);
    // if (ip) {
    //     return ip;
    // } else {
    const answers = await query_dns(name);
    const result: { A?: string; AAAA?: string } = {};
    for (const answer of answers) {
        if (answer.type === "A") {
            result.A = answer.data;
        }
        if (answer.type === "AAAA") {
            result.AAAA = answer.data;
        }
    }
    // dns_cache.set(name, result);
    return result;
    // }
}
