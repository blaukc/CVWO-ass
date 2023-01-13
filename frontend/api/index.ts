import { host } from "./ip";
const axios = require("axios");

export const Get = async (path: string) => {
    const res = await axios.get(`${host}${path}`);
    // error handling somewhere
    return res.data;
};

export const Post = async (path: string, body: any) => {
    const res = await axios.post(`${host}${path}`, JSON.stringify(body));
    // error handling somewhere
    return res.data;
};

export const getCategories = async () => {
    const categories = await Get("/category/");
    return categories;
};

export const getPost = async (postId: string) => {
    const post = await Get(`/post/${postId}`);
    return post;
};

export const getCategoryPosts = async (categoryName: string) => {
    const posts = await Get(`/post/category/${categoryName}`);
    return posts;
};

export const createPost = async (values: any) => {
    const res = await Post(`/post/`, values);
    return res;
};

export const getPostComments = async (postId: string) => {
    const comments = await Get(`/comment/post/${postId}`);
    return comments;
};

export const createComment = async (values: any) => {
    const res = await Post(`/comment/`, values);
    return res;
};
