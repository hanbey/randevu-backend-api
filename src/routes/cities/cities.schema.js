import S from "fluent-json-schema";

export default function (fastify, options, done) {
    fastify.addSchema(
        S.object()
            .id("city")
            .title("City")
            .description("City model")
            .prop("code", S.number())
            .prop("name", S.string())
            .prop("created_at", S.string().format("date-time"))
            .prop("updated_at", S.string().format("date-time"))
    );

    fastify.addSchema(
        S.object()
            .id("get-cities-response")
            .title("GetCitiesResponse")
            .description("Get cities response")
            .prop("status", S.boolean())
            .prop("data", S.array().items(S.ref("city")))
    );

    fastify.addSchema(
        S.object()
            .id("create-city-body")
            .title("CreateCityBody")
            .description("Create city body")
            .prop("code", S.number())
            .prop("name", S.string())
    );

    fastify.addSchema(
        S.object()
            .id("create-city-response")
            .title("CreateCityResponse")
            .description("Create city response")
            .prop("status", S.boolean())
            .prop("data", S.ref("city"))
    );

    fastify.addSchema(
        S.object()
            .id("update-city-body")
            .title("UpdateCityBody")
            .description("Update city body")
            .prop("code", S.number())
            .prop("name", S.string())
    );

    fastify.addSchema(
        S.object()
            .id("update-city-response")
            .title("UpdateCityResponse")
            .description("Update city response")
            .prop("status", S.boolean())
            .prop("data", S.ref("city"))
    );

    done();
}
