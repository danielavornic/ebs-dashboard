import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { UserModalData } from '../../../types/user.types';
import { getUserByEmail, registerUser, updateUser } from '../../../api/users';
import useUserContext from '../../../hooks/useUserContext';

import Button from '../../../components/Button';
import Input from '../../../components/Input';

const UserModalForm = () => {
  const { setIsModalHidden, isModalHidden, selectedUser, modalType } =
    useUserContext();

  const defaultUser = {
    name: '',
    lastName: '',
    email: '',
    gender: '',
    role: null,
  };

  const [user, setNewUser] = useState<UserModalData>(defaultUser);
  const { name, lastName, email, gender, role } = user;

  const formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  useEffect(() => {
    if (selectedUser && selectedUser.name === '') formRef?.current.reset();
  }, [isModalHidden, selectedUser]);

  useEffect(() => {
    if (selectedUser && selectedUser.name !== '') {
      const newSelectedUser: UserModalData = {
        name: selectedUser.name,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        gender: selectedUser.gender,
        role: selectedUser.role,
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
      registerUser(user).then(() => {
        setIsModalHidden(true);
        alert('User added succesfully!');
      });

      return;
    }

    if (modalType === 'edit' && selectedUser && selectedUser.id !== '') {
      const userId = parseInt(selectedUser.id);
      updateUser(userId, user).then(() => {
        setIsModalHidden(true);
        alert('User updated succesfully!');
      });
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
      <select
        name='role'
        id='role'
        onChange={handleChange}
        value={role ? role : ''}
      >
        <option value='' disabled hidden>
          Role
        </option>
        <option value='moderator'>Moderator</option>
        <option value='administrator'>Administrator</option>
      </select>
      <Button type='submit' state='primary'>
        {modalType === 'add' ? 'Add' : 'Edit'} user
      </Button>
    </form>
  );
};

export default UserModalForm;
