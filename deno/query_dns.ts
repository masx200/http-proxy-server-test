import {
    assert,
    assertInstanceOf,
} from "https://deno.land/std@0.137.0/testing/asserts.ts";
import type { IAnswer } from "../node/IAnswer.ts";
export async function query_dns(name: string): Promise<IAnswer[]> {
    const origin = `http://localhost:19002`;
    const client = Deno.createHttpClient({
        proxy: { url: origin },
    });
    try {
        const res = await fetch(
            `${origin}/dns-query?name=${name}`,
        );
        if (res.ok) {
            const data = await res.json();
            assertInstanceOf(data, Array);

            assert(
                // deno-lint-ignore no-explicit-any
                data.every(function (d: any) {
                    return (
                        // deno-lint-ignore ban-ts-comment
                        //@ts-ignore
                        typeof d?.type === "string" &&
                        typeof d?.data === "string"
                    );
                }),
            );
            return data as IAnswer[];
        } else {
            throw Error(["fetch failed", res.url, res.status].join(","));
        }
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        client.close();
    }
}