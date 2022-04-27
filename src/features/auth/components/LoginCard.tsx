import { ChangeEvent, FormEvent, useState } from 'react';

import { LoginCredentials } from '../../../types/user.types';
import { logInUser } from '../../../api/users';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

import '../../../styles/AuthCard.scss';

const LoginCard = () => {
  const [userLoginCredentials, setUserLoginCredentials] =
    useState<LoginCredentials>({
      email: '',
      password: '',
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    logInUser(userLoginCredentials);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserLoginCredentials({ ...userLoginCredentials, [name]: value });
  };

  return (
    <div className='auth-card'>
      <h2>Login</h2>
      <p>Enter your details to sign in into your account.</p>

      <form onSubmit={handleSubmit}>
        <Input
          type='email'
          name='email'
          placeholder='E-mail'
          id='email'
          onChange={handleChange}
        />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          id='password'
          onChange={handleChange}
        />
        <Button type='submit' state='primary'>
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LoginCard;
