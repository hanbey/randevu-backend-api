export default {
    /**
     *
     * @param request {Request}
     * @returns {Promise<{data: *, status: boolean}>}
     */
    async getTowns(request) {
        const towns = await request.models.Town.find().lean();
        return {status: true, data: towns};
    },

    /**
     *
     * @param request {Request}
     * @returns {Promise<{data: *, status: boolean}>}
     */
    async createTown(request) {
        const {code, name, city_code} = request.body;
        const createdTown = await request.models.Town.create({code, name, city_code});
        return {status: true, data: createdTown};
    }
};
