import fastify from "fastify";

export function createServer(opts = {}) {
    const server = fastify(opts);

    // register main plugins

    return server;
}

export async function startServer() {
    const server = createServer({
        logger: {
            level: "info"
        },
        disableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== "true"
    });

    try {
        const port = process.env.PORT ?? 3000;
        await server.listen({host: "0.0.0.0", port});
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
