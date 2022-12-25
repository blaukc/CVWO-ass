import { host } from "./ip";
const axios = require("axios");

export const Get = async (path: string) => {
    const res = await axios.get(`${host}${path}`);
    return res;
};

export const getCategories = async () => {
    const categories = await Get("/category/");
    return categories;
};
