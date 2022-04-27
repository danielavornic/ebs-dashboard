import axios from 'axios';

import { RegisterCredentials, LoginCredentials } from '../types/user.types';

export const registerUser = async (userCredentials: RegisterCredentials) => {
  const { email } = userCredentials;
  const userExists = await axios
    .get(`http://localhost:3000/users?email=${email}`)
    .then((res) => res.data.length === 1);

  if (userExists) {
    alert('User registered with this email already exists.');
  } else {
    const userId = new Date().getTime();
    const newUser = {
      ...userCredentials,
      userId,
    };

    axios
      .post('http://localhost:3000/users', newUser)
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

export const logInUser = (userCredentials: LoginCredentials) => {
  const { email, password } = userCredentials;
  axios
    .get(`http://localhost:3000/users?email=${email}&password=${password}`)
    .then((res) => {
      if (res.data.length === 0) {
        alert('Wrong email or password.');
        return;
      }

      alert('Logged in successfully.');

      const { userId } = res.data[0];
      localStorage.setItem('userId', JSON.stringify(userId));
    })
    .catch((error) => {
      alert('Error logging user.');
      console.log(error);
    });
};
