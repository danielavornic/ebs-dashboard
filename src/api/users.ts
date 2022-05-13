import $axios from './axios';

import {
  RegisterCredentials,
  LoginCredentials,
  UserModalData,
  UserInterface,
} from 'types/user';

export const fetchUsers = async () => {
  const users = await $axios.get('/users/');
  return users.data;
};

export const getUserByEmail = async (email: string) => {
  const users = await $axios.get(`/users?email=${email}`);
  return users.data[0];
};

export const getUserById = async (id: number) => {
  const user = await $axios.get(`/users/${id}`);
  return user.data;
};

export const getUserByCredentials = async (
  userCredentials: LoginCredentials
) => {
  const { email, password } = userCredentials;
  const user = await $axios.get(`/users?email=${email}&password=${password}`);
  return user.data;
};

export const registerUser = (user: RegisterCredentials | UserModalData) => {
  return $axios.post('/users/', user);
};

export const updateUser = (id: number, user: UserInterface) => {
  return $axios.put(`/users/${id}`, user);
};

export const deleteUser = (id: number) => {
  return $axios.delete(`/users/${id}`);
};
