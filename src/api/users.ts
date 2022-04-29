import axios from 'axios';

import {
  RegisterCredentials,
  LoginCredentials,
  UserModalData,
} from '../types/user.types';

export const getUserByEmail = async (email: string) => {
  const res = await axios.get(`http://localhost:3000/users?email=${email}`);
  return res.data[0];
};

export const getUserById = async (id: number) => {
  const res = await axios.get(`http://localhost:3000/users/${id}`);
  return res.data;
};

export const getUserByCredentials = async (
  userCredentials: LoginCredentials
) => {
  const { email, password } = userCredentials;
  return axios.get(
    `http://localhost:3000/users?email=${email}&password=${password}`
  );
};

export const registerUser = (user: RegisterCredentials | UserModalData) => {
  return axios.post('http://localhost:3000/users', user);
};

export const fetchUsers = () => {
  return axios.get('http://localhost:3000/users');
};

export const updateUser = (id: number, user: UserModalData) => {
  return axios.put(`http://localhost:3000/users/${id}`, user);
};
