import process from "process";
import { listening_port } from "./listening_port.ts";

import { start } from "./start.ts";
//console.log(process)
process.on("unhandledRejection", (e) => {
    console.error(e);
});
import parse from "@masx200/mini-cli-args-parser";
const args = process.argv.slice(2);
const opts = parse(args);
const { port } = opts;
await start(Number.isNaN(Number(port)) ? listening_port : port);
