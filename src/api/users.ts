import axios from 'axios';

import {
  RegisterCredentials,
  LoginCredentials,
  UserModalData,
} from '../types/user';

const UsersClient = axios.create({
  baseURL: 'http://localhost:3000/users/',
});

export const fetchUsers = () => {
  return UsersClient.get('');
};

export const getUserByEmail = async (email: string) => {
  const res = await UsersClient.get(`?email=${email}`);
  return res.data[0];
};

export const getUserById = async (id: number) => {
  const res = await UsersClient.get(`/${id}`);
  return res.data;
};

export const getUserByCredentials = async (
  userCredentials: LoginCredentials
) => {
  const { email, password } = userCredentials;
  return UsersClient.get(`?email=${email}&password=${password}`);
};

export const registerUser = (user: RegisterCredentials | UserModalData) => {
  return UsersClient.post('', user);
};

export const updateUser = (id: number, user: UserModalData) => {
  return UsersClient.put(`/${id}`, user);
};

export const deleteUser = (id: number) => {
  return UsersClient.delete(`/${id}`);
};
