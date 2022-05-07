export interface NotFoundHandler {
    (request: Request): Promise<Response> | Response;
}
