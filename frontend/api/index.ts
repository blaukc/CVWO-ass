import { host } from "./ip";
const axios = require("axios");

export const Get = async (path: string) => {
    try {
        const res = await axios.get(`${host}${path}`);
        // error handling somewhere
        return res.data;
    } catch (error) {}
};

export const Post = async (path: string, body: any) => {
    try {
        const res = await axios.post(`${host}${path}`, JSON.stringify(body));
        // error handling somewhere
        console.log(res);
        return true;
    } catch (error) {
        // Need some better error handling but i have no time
        return false;
    }
};

export const Patch = async (path: string, body: any) => {
    try {
        const res = await axios.patch(`${host}${path}`, JSON.stringify(body));
        return true;
    } catch (error) {
        // Need some better error handling but i have no time
        return false;
    }
};

export const Delete = async (path: string) => {
    try {
        const res = await axios.delete(`${host}${path}`);
        // error handling somewhere
        return true;
    } catch (error) {
        // Need some better error handling but i have no time
        return false;
    }
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

export const deletePost = async (commentId: string) => {
    const res = await Delete(`/post/${commentId}`);
    return res;
};

export const patchPost = async (commentId: string, values: any) => {
    const res = await Patch(`/post/${commentId}`, values);
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

export const deleteComment = async (commentId: string) => {
    const res = await Delete(`/comment/${commentId}`);
    return res;
};

export const patchComment = async (commentId: string, values: any) => {
    const res = await Patch(`/comment/${commentId}`, values);
    return res;
};
