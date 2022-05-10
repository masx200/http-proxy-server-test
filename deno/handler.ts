import { createHandler } from "./createHandler.ts";
import { error_handler } from "./error_handler.ts";
import { logger } from "./logger.ts";
import { notfound_handler } from "./notfound_handler.ts";
import { process_connect } from "./process_connect.ts";
import { process_proxy } from "./process_proxy.ts";
import { process_request } from "./process_request.ts";
import { process_self } from "./process_self.ts";
import { process_websocket } from "./process_websocket.ts";
import { response_builder } from "./response_builder.ts";

const middleware = [
    logger,
    process_proxy,
    process_self,
    process_websocket,
    process_request,
    process_connect,
];
export const handler = createHandler(middleware, {
    notfoundHandler: notfound_handler,
    errorHandler: error_handler,
    responseBuilder: response_builder,
});
