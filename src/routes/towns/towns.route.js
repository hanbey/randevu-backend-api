import S from "fluent-json-schema";

import townsController from "./towns.controller.js";

export default function (fastify, options, done) {
    fastify.addHook("onRequest", function (request, reply, next) {
        request.models = this.mongo.client.models;
        next();
    });

    fastify.route({
        method: "GET",
        path: "/",
        handler: townsController.getTowns,
        schema: {
            tags: ["Town"],
            response: {
                200: S.ref("get-towns-response")
            }
        }
    });

    fastify.route({
        method: "POST",
        path: "/",
        handler: townsController.createTown,
        schema: {
            tags: ["Town"],
            body: S.ref("create-town-body"),
            response: {
                200: S.ref("create-town-response")
            }
        }
    });

    done();
}
