import axios from 'axios';

import {
  RegisterCredentials,
  LoginCredentials,
  UserModalData,
} from 'types/user';

const UsersClient = axios.create({
  baseURL: 'http://localhost:3000/users/',
});

export const fetchUsers = async () => {
  const users = await UsersClient.get('');
  return users.data;
};

export const getUserByEmail = async (email: string) => {
  const users = await UsersClient.get(`?email=${email}`);
  return users.data[0];
};

export const getUserById = async (id: number) => {
  const user = await UsersClient.get(`/${id}`);
  return user.data;
};

export const getUserByCredentials = async (
  userCredentials: LoginCredentials
) => {
  const { email, password } = userCredentials;
  const user = await UsersClient.get(`?email=${email}&password=${password}`);
  return user.data;
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
