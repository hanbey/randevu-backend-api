import connectDatabase from "../utils/connect-database.js";

export const autoConfig = {url: process.env.MONGODB_CONNECTION_STRING};

export default connectDatabase;
