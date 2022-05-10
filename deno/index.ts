import { listening_port } from "./listening_port.ts";
import { start } from "./start.ts";
import { parse } from "../deps.ts";

if (import.meta.main) {
    const { port } = parse(Deno.args);
    await start(Number.isNaN(Number(port)) ? listening_port : port);
}
