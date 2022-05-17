import $axios from './axios';

import { PostInterface } from 'types/post';

export const fetchPosts = async () => {
  const posts = await $axios.get('/posts/');
  return posts.data;
};

export const getPostById = async (id: number) => {
  try {
    const post = await $axios.get(`/posts/${id}`);
    return post.data;
  } catch (error) {
    return null;
  }
};

export const addPost = (post: PostInterface) => {
  return $axios.post('/posts/', post);
};

export const updatePost = (post: PostInterface) => {
  return $axios.put(`/posts/${post.id}`, post);
};

export const deletePost = (id: number) => {
  return $axios.delete(`/posts/${id}`);
};
