import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { UserModalData } from '../../../types/user';
import { getUserByEmail, registerUser, updateUser } from '../../../api/users';
import useUserContext from '../../../hooks/useUserContext';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

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
    setNewUser({ ...user, [name]: value });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        id='name'
        onChange={handleChange}
      />
      <Input
        type='text'
        placeholder='Last name'
        name='lastName'
        value={lastName}
        id='last-name'
        onChange={handleChange}
      />
      <Input
        type='email'
        placeholder='E-mail'
        name='email'
        value={email}
        id='email'
        onChange={handleChange}
      />
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
      <select name='role' id='role' onChange={handleChange} value={role}>
        <option value='' disabled hidden>
          Role
        </option>
        <option value='moderator'>Moderator</option>
        <option value='administrator'>Administrator</option>
      </select>
      <Button type='submit' state='primary'>
        {modalType === 'add' ? 'Add user' : 'Save changes'}
      </Button>
    </form>
  );
};

export default UserModalForm;
