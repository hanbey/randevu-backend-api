import swagger from "@fastify/swagger";

export const autoConfig = {
    routePrefix: "/api-docs",
    openapi: {
        info: {
            title: "",
            description: "",
            version: ""
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        tags: []
    },
    exposeRoute: true,
    uiConfig: {
        docExpansion: "full",
        deepLinking: false,
        persistAuthorization: true
    }
};

export default swagger;
