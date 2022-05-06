import { listening_port } from "./listening_port.ts";
import { start } from "./start.ts";
//console.log(import.meta)
if (import.meta.main) await start(listening_port);
