import { ChangeEvent, FormEvent, useState } from 'react';
import { UserDetails } from '../../../types/user.types';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import SelectGender from './SelectGender';

const UserModalForm = () => {
  const [newUser, setNewUser] = useState<UserDetails>({
    name: '',
    lastName: '',
    email: '',
    gender: '',
    role: 'moderator',
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(newUser);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
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
