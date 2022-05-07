export interface ErrorHandler {
    (request: Request, error: unknown): Promise<Response> | Response;
}
