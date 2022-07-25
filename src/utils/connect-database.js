import Mongoose from "mongoose";
import fp from "fastify-plugin";

function decorateFastifyInstance(fastify, client, options, next) {
    const forceClose = options.forceClose;
    const name = options.name;
    const newClient = options.newClient;

    if (newClient) {
        // done() is not needed because .close() returns a Promise
        fastify.addHook("onClose", () => client.close(forceClose));
    }

    const mongo = {
        client: client,
        ObjectId: Mongoose.mongo.ObjectId
    };

    if (name) {
        if (!fastify.mongo) {
            fastify.decorate("mongo", mongo);
        }
        if (fastify.mongo[name]) {
            next(new Error(`Connection name already registered: ${name}`));
            return;
        }

        fastify.mongo[name] = client;
    } else {
        if (fastify.mongo) {
            next(new Error("fastify-mongoose-connection has already registered"));
            return;
        }
    }

    if (!fastify.mongo) {
        fastify.decorate("mongo", mongo);
    }

    next();
}

function fastifyMongooseClient(fastify, opts, next) {
    const options = Object.assign(
        {
            serverSelectionTimeoutMS: 7500,
            forceClose: true
        },
        opts
    );

    const forceClose = options.forceClose;
    delete options.forceClose;

    const name = options.name;
    delete options.name;

    const url = options.url;
    delete options.url;
    if (!url) {
        next(new Error("`url` parameter is mandatory if no client is provided"));
        return;
    }

    Mongoose.set("debug", options.debug);
    delete options.debug;

    Mongoose.connect(url, options, function onConnect(error, client) {
        if (error) {
            next(error);
            return;
        }

        decorateFastifyInstance(
            fastify,
            client,
            {
                newClient: true,
                forceClose: forceClose,
                name: name
            },
            next
        );
    });
}

export default fp(fastifyMongooseClient, {
    fastify: "4.x",
    name: "@fastify/mongoose"
});

export const ObjectId = Mongoose.mongo.ObjectId;
