export async function connect_port_ip(
    connect_port: number,
    ip: string
): Promise<string> {
    const c = await Deno.connect({
        port: connect_port,
        hostname: ip,
    });
    c.close();
    // console.log({ ip });
    return ip;
}
