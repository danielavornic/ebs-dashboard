import axios from 'axios';

import { UserCredentials } from '../types/user.types';

const userWithEmailExists = (serverUsers: any, email: string) => {
  const user = serverUsers.find((u: { email: string }) => u.email === email);
  return user;
};

export const registerUser = async (userCredentials: UserCredentials) => {
  const { email } = userCredentials;
  const user = await axios
    .get('http://localhost:3000/users')
    .then((res) => userWithEmailExists(res.data, email));

  if (user) {
    alert('User registered with this email already exists.');
  } else {
    axios
      .post('http://localhost:3000/users', userCredentials)
      .then((response) => {
        alert('User created successfully.');
        console.log(response);
      })
      .catch((error) => {
        alert('Error creating user.');
        console.log(error);
      });
  }
};
