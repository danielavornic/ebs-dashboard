import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { NewUserDetails } from '../../../types/user.types';
import { getUserByEmail, registerUser } from '../../../api/users';
import useUserContext from '../../../hooks/useUserContext';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import SelectGender from './SelectGender';

const UserModalForm = () => {
  const { setIsModalHidden, isModalHidden } = useUserContext();

  const [newUser, setNewUser] = useState<NewUserDetails>({
    name: '',
    lastName: '',
    email: '',
    gender: '',
    role: 'moderator',
  });

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  useEffect(() => formRef?.current.reset(), [isModalHidden]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const existingUser = await getUserByEmail(newUser.email);
    if (existingUser) {
      alert('User registered with this email already exists.');
      return;
    }

    registerUser(newUser).then(() => {
      setIsModalHidden(true);
      alert('User added succesfully!');
    });
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
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
      <SelectGender onChange={handleChange} />
      <select
        name='role'
        id='role'
        onChange={handleChange}
        required
        defaultValue={''}
      >
        <option value='' disabled hidden>
          Role
        </option>
        <option value='moderator'>Moderator</option>
        <option value='administrator'>Administrator</option>
      </select>
      <Button type='submit' state='primary'>
        Add user
      </Button>
    </form>
  );
};

export default UserModalForm;
