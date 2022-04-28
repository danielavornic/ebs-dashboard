import axios from 'axios';

import { RegisterCredentials, LoginCredentials } from '../types/user.types';

export const getUserByEmail = async (email: string) => {
  const res = await axios.get(`http://localhost:3000/users?email=${email}`);
  return res.data[0];
};

export const getUserById = async (id: number) => {
  const res = await axios.get(`http://localhost:3000/users?id=${id}`);
  return res.data[0];
};

export const getUserByCredentials = async (
  userCredentials: LoginCredentials
) => {
  const { email, password } = userCredentials;
  return axios.get(
    `http://localhost:3000/users?email=${email}&password=${password}`
  );
};
export const registerUser = (userCredentials: RegisterCredentials) => {
  const id = new Date().getTime();
  const newUser = {
    ...userCredentials,
    id,
  };
  return axios.post('http://localhost:3000/users', newUser);
};
