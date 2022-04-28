import { ChangeEvent, FormEvent, useState } from 'react';

import { RegisterCredentials } from '../../../types/user.types';
import { registerUser, getUserByEmail } from '../../../api/users';
import useUserContext from '../../../hooks/useUserContext';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

import '../../../styles/AuthCard.scss';

const RegisterCard = () => {
  const { setUser } = useUserContext();

  const [userCredentials, setUserCredentials] = useState<RegisterCredentials>({
    name: '',
    lastName: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });
  const { email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      alert('User registered with this email already exists.');
      return;
    }

    registerUser(userCredentials).then((res) => {
      const user = res.data;
      setUser(user);
      localStorage.setItem('userId', user.id);
    });
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className='auth-card'>
      <h2>Register</h2>
      <p>Enter your details to create your account.</p>

      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='Name'
          name='name'
          id='name'
          onChange={handleChange}
        />
        <Input
          type='text'
          placeholder='Last name'
          name='lastName'
          id='last-name'
          onChange={handleChange}
        />
        <Input
          type='email'
          placeholder='E-mail'
          name='email'
          id='email'
          onChange={handleChange}
        />
        <select
          name='gender'
          id='gender'
          onChange={handleChange}
          required
          defaultValue={''}
        >
          <option value='' disabled>
            Gender
          </option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Not specified'>Prefer not to say</option>
        </select>
        <Input
          type='password'
          placeholder='Password'
          name='password'
          id='password'
          onChange={handleChange}
        />
        <Input
          type='password'
          placeholder='Confirm password'
          name='confirmPassword'
          id='confirm-password'
          onChange={handleChange}
        />
        <Input
          type='checkbox'
          id='terms'
          name='terms'
          onChange={handleChange}
        />
        <label htmlFor='terms'>
          I agree to the processing of personal data
        </label>
        <Button type='submit' state='primary'>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterCard;
