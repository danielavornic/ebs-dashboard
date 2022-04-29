import { useEffect, useState } from 'react';

import { User, UserProperties } from '../../../types/user.types';
import { fetchUsers } from '../../../api/users';

import Layout from '../../../components/Layout/Layout';
import Modal from '../../../components/Modal';
import UserModalForm from '../components/UserModalForm';
import useUserContext from '../../../hooks/useUserContext';

const Users = () => {
  const headings = ['Name', 'Last Name', 'Email', 'Gender'];
  const properties: UserProperties[] = ['name', 'lastName', 'email', 'gender'];

  const [users, setUsers] = useState<User[]>([]);

  const { isModalHidden, modalType } = useUserContext();

  useEffect(() => {
    fetchUsers().then((res) => setUsers(res.data));
  }, [isModalHidden]);

  return (
    <>
      <Modal title={modalType === 'add' ? 'Add user' : 'Edit user'}>
        <UserModalForm />
      </Modal>
      <Layout
        page='users'
        data={users}
        headings={headings}
        properties={properties}
      />
    </>
  );
};

export default Users;
