import {
    conditional_get,
    createHandler,
    etag_builder,
    json_builder,
    logger,
    Middleware,
    stream_etag,
} from "../deps.ts";
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
