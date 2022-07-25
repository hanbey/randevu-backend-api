import path from "node:path";
import fastify from "fastify";
import {fileURLToPath} from "node:url";
import autoload from "@fastify/autoload";
import sensible from "@fastify/sensible";

import "./models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer(opts = {}) {
    const server = fastify(opts);

    server.register(sensible);
    server.register(autoload, {dir: path.join(__dirname, "plugins")});

    // add schema definations
    server.register(autoload, {
        dir: path.join(__dirname, "routes"),
        ignorePattern: /.*.(controller|route).js/,
        encapsulate: false
    });

    server.after((error) => {
        if (error) {
            throw error;
        }
    });

    server.register(autoload, {
        dir: path.join(__dirname, "routes"),
        ignorePattern: /.*.(controller|schema).js/
    });

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
