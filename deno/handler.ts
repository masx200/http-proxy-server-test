import {
    createHandler,
    Middleware,
} from "https://deno.land/x/masx200_deno_http_middleware@1.0.6/mod.ts";
import {
    conditional_get,
    etag_builder,
    json_builder,
    logger,
    stream_etag,
} from "https://cdn.jsdelivr.net/gh/masx200/deno-http-middleware@1.0.6/middleware.ts";
import { process_connect } from "./process_connect.ts";
import { process_proxy } from "./process_proxy.ts";
import { process_request } from "./process_request.ts";
import { process_self } from "./process_self.ts";
import { process_websocket } from "./process_websocket.ts";

const middleware: Middleware[] = [
    logger,
    conditional_get,

    json_builder,

    etag_builder,
    stream_etag(),
    process_proxy,
    process_self,
    process_websocket,
    process_request,
    process_connect,
];
export const handler = createHandler(middleware, {});
