import { STATUS_TEXT } from "../deps.ts";

export const error_handler = (req: Request, err: unknown): Response =>
    new Response(`${STATUS_TEXT.get(500)}\n${req.url}` + "\n" + String(err), {
        status: 500,
    });
