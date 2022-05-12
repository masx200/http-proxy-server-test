import compression from "compression";
import express from "express";
import { handle_dns } from "./handle_dns.ts";
//@ts-ignore
import preconditions from "express-preconditions";

//@ts-ignore
import expressLogging from "express-logging";
import logger from "logops";
export const app = express();
app.use(preconditions());
app.set("x-powered-by", false);
app.use(compression());
app.use(expressLogging(logger));
app.use((req, res, next) => {
    const { method, url, headers } = req;
    console.log("request",{ method, url, headers });
    next();
});

app.get("/dns-query", async (req, res, next) => {
    try {
        await handle_dns(req, res, next);
    } catch (error) {
        console.error(error);
        res.statusCode = 500;

        res.end(String(error));
        return;
    } finally {
        console.log("response",{
            url: req.url,
            status: res.statusCode,
            headers: res.getHeaders(),
        });
    }
});
