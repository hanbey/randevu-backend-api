import createError from "http-errors";

export default {
    /**
     *
     * @param request {Request}
     * @returns {Promise<{data: *, status: boolean}>}
     */
    async getCities(request) {
        const cities = await request.models.City.find().lean();
        return {status: true, data: cities};
    },

    /**
     *
     * @param request {Request}
     * @returns {Promise<{data: *, status: boolean}>}
     */
    async createCity(request) {
        const {code, name} = request.body;
        const createdCity = await request.models.City.create({code, name});
        return {status: true, data: createdCity};
    },

    /**
     *
     * @param request {Request}
     * @returns {Promise<{data: *, status: boolean}>}
     */
    async updateCity(request) {
        const {city_id} = request.params;
        const {code, name} = request.body;

        const city = await request.models.City.findOne({_id: city_id});

        if (!city) {
            throw createError(400, "city_not_found");
        }

        city.code = code;
        city.name = name;

        await city.save();

        return {
            status: true,
            data: city
        };
    }
};
