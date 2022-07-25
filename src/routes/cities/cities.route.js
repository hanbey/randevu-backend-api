import S from "fluent-json-schema";

import citiesController from "./cities.controller.js";

export default function (fastify, options, done) {
    fastify.decorateRequest("models", "");

    fastify.addHook("onRequest", function (request, reply, next) {
        request.models = this.mongo.client.models;

        next();
    });

    fastify.route({
        method: "GET",
        path: "/",
        handler: citiesController.getCities,
        schema: {
            tags: ["City"],
            response: {
                200: S.ref("get-cities-response")
            }
        }
    });

    fastify.route({
        method: "POST",
        path: "/",
        handler: citiesController.createCity,
        schema: {
            tags: ["City"],
            body: S.ref("create-city-body"),
            response: {
                200: S.ref("create-city-response")
            }
        }
    });

    fastify.route({
        method: "PUT",
        path: "/:city_id",
        handler: citiesController.updateCity,
        schema: {
            tags: ["City"],
            body: S.ref("update-city-body"),
            response: {
                200: S.ref("update-city-response")
            }
        }
    });

    done();
}
