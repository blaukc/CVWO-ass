import { host } from "./ip";
const axios = require("axios");

export const Get = async (path: string) => {
    const res = await axios.get(`${host}${path}`);
    // error handling somewhere
    return res.data;
};

export const Post = async (path: string, body: any) => {
    const res = await axios.post(`${host}${path}`, body);
    // error handling somewhere
    return res.data;
};

export const getCategories = async () => {
    const categories = await Get("/category/");
    return categories;
};

export const getCategoryPosts = async (categoryName: string) => {
    const posts = await Get(`/post/category/${categoryName}`);
    return posts;
};

export const createPost = async (values: any) => {
    console.log(values);
    const res = await Post(`/post/`, JSON.stringify(values));
    return res;
};
