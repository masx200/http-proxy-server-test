import { IncomingMessage, ServerResponse } from "http";
import etag from "etag";
import { query_dns } from "./query_dns.ts";
import type { NextFunction } from "express";

export async function handle_dns(
    req: IncomingMessage,
    res: ServerResponse,
    next: NextFunction,
) {
    const { headers } = req;

    const urlobj = new URL(
        req.url ?? "/",
        `http://${headers.host ?? "localhost"}`,
    );
    const name = urlobj.searchParams.get("name");
    if (
        req.method?.toLowerCase() === "get" &&
        urlobj.pathname === "/dns-query" &&
        name
    ) {
        const r = await query_dns(name);

        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("cache-control", "max-age=320");
        const body = JSON.stringify(r);
        res.setHeader("ETag", etag(body));
        res.end(body);
    } else {
        // res.statusCode = 404;
        // res.end("404");
        next();
    }
}
