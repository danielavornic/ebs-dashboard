import axios from 'axios';
import { PostInterface } from 'types/post';

const PostsClient = axios.create({
  baseURL: 'http://localhost:3000/posts/',
});

export const fetchPosts = async () => {
  const posts = await PostsClient.get('');
  return posts.data;
};

export const getPostById = async (id: number) => {
  const post = await PostsClient.get(`/${id}`);
  return post.data;
};

export const addPost = (post: PostInterface) => {
  return PostsClient.post('', post);
};

export const updatePost = (id: number, post: PostInterface) => {
  return PostsClient.put(`/${id}`, post);
};

export const deletePost = (id: number) => {
  return PostsClient.delete(`/${id}`);
};
