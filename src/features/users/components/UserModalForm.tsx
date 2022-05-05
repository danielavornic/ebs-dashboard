import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { UserModalData } from 'types/user';
import { getUserByEmail, registerUser, updateUser } from 'api/users';
import useUserContext from 'hooks/useUserContext';

import Button from 'components/Button';
import Input from 'components/Input';

const defaultUser: UserModalData = {
  name: '',
  lastName: '',
  email: '',
  gender: '',
  role: 'moderator',
};

const UserModalForm = () => {
  const { setIsModalHidden, isModalHidden, selectedUser, modalType } =
    useUserContext();

  const [user, setNewUser] = useState<UserModalData>(defaultUser);
  const { name, lastName, email, gender, role } = user;

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  useEffect(() => {
    if (selectedUser && selectedUser.name === '') formRef?.current.reset();
  }, [isModalHidden, selectedUser]);

  useEffect(() => {
    if (selectedUser && selectedUser.name !== '') {
      const newSelectedUser: UserModalData = {
        ...selectedUser,
      };
      setNewUser(newSelectedUser);
      return;
    }

    setNewUser(defaultUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (modalType === 'add') {
      const existingUser = await getUserByEmail(user.email);
      if (existingUser) {
        alert('User registered with this email already exists.');
        return;
      }

      await registerUser(user);
      setIsModalHidden(true);
    }

    if (modalType === 'edit' && selectedUser && selectedUser.id !== '') {
      const userId = parseInt(selectedUser.id);
      await updateUser(userId, user);
      setIsModalHidden(true);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewUser((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
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
          <option value='moderator'>Moderator</option>
          <option value='administrator'>Administrator</option>
        </select>
      </div>

      <div className='form__btn'>
        <Button type='submit' state='primary' size='block'>
          {modalType === 'add' ? 'Add user' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
};

export default UserModalForm;
