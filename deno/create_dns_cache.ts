import type { DNS_Cache } from "./DNS_Cache_type.ts";

export function create_dns_cache(age: number): DNS_Cache {
    const dns_cache = new Map<string, { A?: string; AAAA?: string }>();
    const expires = new Map<string, number>();
    return {
        storage: dns_cache,
        get(
            name: string,
        ): { A?: string | undefined; AAAA?: string | undefined } | undefined {
            const exp = expires.get(name);
            if (exp && Number(new Date()) > exp) {
                expires.delete(name);
                dns_cache.delete(name);
                return;
            }
            return dns_cache.get(name);
        },
        set(name: string, value: { A?: string; AAAA?: string }) {
            dns_cache.set(name, value);
            expires.set(name, age + Number(new Date()));
        },
    };
}
