import { STATUS_TEXT } from "../deps.ts";

export const notfound_handler = (req: Request): Response =>
    new Response(`${STATUS_TEXT.get(404)}\n${req.url}`, { status: 404 });
