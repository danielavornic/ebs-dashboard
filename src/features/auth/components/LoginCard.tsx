import { ChangeEvent, FormEvent, useState } from 'react';
import { useQuery } from 'react-query';

import { LoginCredentials } from 'types/user';
import { getUserByCredentials } from 'api/users';
import useUserContext from 'hooks/useUserContext';

import { Button, Input } from 'components';

const LoginCard = () => {
  const { setUser } = useUserContext();

  const [userLoginCredentials, setUserLoginCredentials] =
    useState<LoginCredentials>({
      email: '',
      password: '',
    });
  const { email, password } = userLoginCredentials;

  const { data: userData } = useQuery(
    ['user', userLoginCredentials],
    () => getUserByCredentials(userLoginCredentials),
    {
      enabled: !!email && !!password,
    }
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userData.length === 0) {
      alert('Wrong email or password.');
      return;
    }

    setUser(userData[0]);
    localStorage.setItem('userId', userData[0].id);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserLoginCredentials((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className='form-card'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form__header'>
          <h2 className='form__title'>Login</h2>
          <p>Enter your details to sign into your account.</p>
        </div>

        <div className='form__group'>
          <label htmlFor='email' hidden>
            E-mail
          </label>
          <Input
            type='email'
            placeholder='E-mail'
            name='email'
            id='email'
            width='full'
            onChange={handleChange}
          />
        </div>
        <div className='form__group'>
          <label htmlFor='password' hidden>
            Password
          </label>
          <Input
            type='password'
            placeholder='Password'
            name='password'
            id='password'
            width='full'
            onChange={handleChange}
          />
        </div>
        <div className='form__btn'>
          <Button type='submit' state='primary' size='block'>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
