import cityService from "../../services/city.service.js";

export default {
    /**
     * GET /cities
     *
     * Get cities
     */
    async getCities(request, reply) {
        const result = await cityService.getCities(request);
        return reply.send(result);
    },

    /**
     * POST /cities
     *
     * Create city
     */
    async createCity(request, reply) {
        const result = await cityService.createCity(request);
        return reply.send(result);
    },

    /**
     * PUT /cities/:city_id
     *
     * Create city
     */
    async updateCity(request, reply) {
        const result = await cityService.updateCity(request);
        return reply.send(result);
    }
};
