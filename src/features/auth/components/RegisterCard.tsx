import { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import { RegisterCredentials, UserRole } from 'types/user';
import { registerUser, getUserByEmail } from 'api/users';
import useUserContext from 'hooks/useUserContext';

import { Button, Input } from 'components';

const initialUser = {
  name: '',
  lastName: '',
  email: '',
  gender: '',
  password: '',
  confirmPassword: '',
  role: UserRole.Moderator,
};

const RegisterCard = () => {
  const { setUser, setIsLogged } = useUserContext();

  const [userCredentials, setUserCredentials] =
    useState<RegisterCredentials>(initialUser);
  const { email, password, confirmPassword } = userCredentials;

  const { data: existingUser } = useQuery(
    ['user', userCredentials],
    () => getUserByEmail(email),
    {
      enabled: !!email,
    }
  );

  const registerUserMutation = useMutation(registerUser, {
    onSuccess: ({ data: user }) => {
      setUser(user);
      setIsLogged(true);
      localStorage.setItem('userId', user.id);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    if (existingUser) {
      alert('User registered with this email already exists.');
      return;
    }

    delete userCredentials.confirmPassword;
    registerUserMutation.mutate(userCredentials);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserCredentials((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className='form-card'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='form__header'>
          <h2 className='form__title'>Register</h2>
          <p>Enter your details to create your account.</p>
        </div>

        <div className='form__group'>
          <label htmlFor='name' hidden>
            Name
          </label>
          <Input
            type='text'
            placeholder='Name'
            name='name'
            id='name'
            width='full'
            onChange={handleChange}
          />
        </div>
        <div className='form__group'>
          <label htmlFor='lastName' hidden>
            Last name
          </label>
          <Input
            type='text'
            placeholder='Last name'
            name='lastName'
            id='last-name'
            width='full'
            onChange={handleChange}
          />
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
          <label htmlFor='gender' hidden>
            Gender
          </label>
          <select
            name='gender'
            id='gender'
            onChange={handleChange}
            required
            defaultValue={''}
          >
            <option value='' disabled hidden>
              Gender
            </option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Prefer not to say'>Prefer not to say</option>
          </select>
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
        <div className='form__group'>
          <label htmlFor='confirmPassword' hidden>
            Confirm password
          </label>
          <Input
            type='password'
            placeholder='Confirm password'
            name='confirmPassword'
            id='confirm-password'
            width='full'
            onChange={handleChange}
          />
        </div>
        <div className='form__group'>
          <Input type='checkbox' id='terms' name='terms' />
          <label htmlFor='terms'>
            I agree to the processing of personal data
          </label>
        </div>

        <div className='form__btn'>
          <Button type='submit' state='primary' size='block'>
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCard;
