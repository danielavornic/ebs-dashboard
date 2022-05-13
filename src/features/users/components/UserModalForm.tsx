import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { User, UserInterface, UserModalData, UserRole } from 'types/user';

import { Button, Input } from 'components';

const defaultUser: UserModalData = {
  name: '',
  lastName: '',
  email: '',
  gender: '',
  role: UserRole.Moderator,
};

interface Props {
  data: UserInterface;
  buttonText: string;
  userAction: (user: User) => Promise<void>;
}

const UserModalForm = ({ data, userAction, buttonText }: Props) => {
  const [user, setNewUser] = useState<UserModalData>(defaultUser);
  const { name, lastName, email, gender, role } = user;

  useEffect(() => setNewUser(data ? { ...data } : defaultUser), [data]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewUser((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await userAction(user as User);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
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
          value={name}
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
          value={lastName}
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
          value={email}
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
          value={gender}
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
        <label htmlFor='role' hidden>
          Role
        </label>
        <select name='role' id='role' onChange={handleChange} value={role}>
          <option value='' disabled hidden>
            Role
          </option>
          <option value={UserRole.Moderator}>Moderator</option>
          <option value={UserRole.Admin}>Administrator</option>
        </select>
      </div>

      <div className='form__btn'>
        <Button type='submit' state='primary' size='block'>
          {buttonText}
        </Button>
      </div>
    </form>
  );
};

export default UserModalForm;
