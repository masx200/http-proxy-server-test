import { query } from "dns-over-tls";
import type { IAnswer } from "./IAnswer.ts";

export async function query_dns(name: string): Promise<IAnswer[]> {
    const d = await Promise.all([
        query({
            name: name,
            host: "223.5.5.5",
            servername: "dns.alidns.com",
            type: "AAAA",
        }),
        query({
            name: name,
            host: "223.5.5.5",
            servername: "dns.alidns.com",
            type: "A",
        }),
    ]);
    const r = d
        .map((i) => i.answers)
        .flat()
        .filter((a) => ["A", "AAAA"].includes(a.type));
    return r.map((a) => ({ type: a.type, data: a.data }));
}
