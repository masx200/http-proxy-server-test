import { create_cache } from "./create_cache.ts";
import type { DNS_Cache } from "./DNS_Cache_type.ts";

export function create_dns_cache(age: number): DNS_Cache {
    return create_cache<string, string[]>(age);
}
