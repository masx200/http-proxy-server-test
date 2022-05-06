import { createServer } from "http";
import { app } from "./app.ts";

export async function start(port: number) {
    return await new Promise<void>((resolve, reject) => {
        const server = createServer();
        server.on("error", (err: any) => {
            console.error(err);
            reject(err);
        });
        server.on("request", app);
        server.listen({ port }, () => {
            console.log(`Server listening`, server.address());
            resolve();
        });
    });
}
