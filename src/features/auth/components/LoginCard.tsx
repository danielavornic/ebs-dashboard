import { ChangeEvent, FormEvent, useContext, useState } from 'react';

import { LoginCredentials } from '../../../types/user.types';
import { getUserByCredentials } from '../../../api/users';
import { UserContext } from '../../../App';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

import '../../../styles/AuthCard.scss';

const LoginCard = () => {
  const [, setUser] = useContext(UserContext);

  const [userLoginCredentials, setUserLoginCredentials] =
    useState<LoginCredentials>({
      email: '',
      password: '',
    });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    getUserByCredentials(userLoginCredentials).then((res) => {
      if (res.data.length === 0) {
        alert('Wrong email or password.');
        return;
      }

      const user = res.data[0];
      setUser(user);
      localStorage.setItem('userId', user.id);
    });
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
