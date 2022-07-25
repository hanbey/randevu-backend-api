import S from "fluent-json-schema";

export default function (fastify, options, done) {
    fastify.addSchema(
        S.object()
            .id("town")
            .title("Town")
            .description("Town model")
            .prop("code", S.number())
            .prop("name", S.string())
            .prop("city_code", S.number())
            .prop("created_at", S.string().format("date-time"))
            .prop("updated_at", S.string().format("date-time"))
    );

    fastify.addSchema(
        S.object()
            .id("get-towns-response")
            .title("GetTownsResponse")
            .description("Get towns response")
            .prop("status", S.boolean())
            .prop("data", S.array().items(S.ref("town")))
    );

    fastify.addSchema(
        S.object()
            .id("create-town-body")
            .title("CreateTownBody")
            .description("Create town body")
            .prop("code", S.number())
            .prop("name", S.string())
            .prop("city_code", S.number())
    );

    fastify.addSchema(
        S.object()
            .id("create-town-response")
            .title("CreateTownResponse")
            .description("Create town response")
            .prop("status", S.boolean())
            .prop("data", S.ref("town"))
    );

    done();
}
