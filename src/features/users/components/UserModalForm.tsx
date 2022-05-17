import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { User, UserInterface, UserModalData, UserRole } from 'types/user';

import { Button, Input } from 'components';
import { getUserByEmail } from 'api/users';

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
  onSubmit: (user: User) => void;
}

const UserModalForm = ({ data, onSubmit, buttonText }: Props) => {
  const queryClient = useQueryClient();

  const [user, setUser] = useState<UserModalData>(defaultUser);
  const { name, lastName, email, gender, role } = user;
  const { email: initialEmail } = data || defaultUser;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUser((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const { data: userWithEmail } = useQuery(
    ['user', email],
    () => getUserByEmail(email),
    {
      enabled: !!email,
    }
  );

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (userWithEmail && email !== initialEmail) {
      alert('User registered with this email already exists.');
      queryClient.invalidateQueries(userWithEmail);
      return;
    }

    onSubmit(user as User);
  };

  useEffect(() => setUser(data ? { ...data } : defaultUser), [data]);

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
