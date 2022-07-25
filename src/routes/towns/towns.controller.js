import townService from "../../services/town.service.js";

export default {
    /**
     * GET /towns
     *
     * Get towns
     */
    async getTowns(request, reply) {
        const result = await townService.getTowns(request);
        return reply.send(result);
    },

    /**
     * POST /towns
     *
     * Create town
     */
    async createTown(request, reply) {
        const result = await townService.createTown(request);
        return reply.send(result);
    }
};
