import { useEffect, useState } from 'react';

import { User, UserProperties } from '../../../types/user.types';
import { fetchUsers } from '../../../api/users';
import useUserContext from '../../../hooks/useUserContext';

import Layout from '../../../components/Layout/Layout';
import Modal from '../../../components/Modal';
import UserModalForm from '../components/UserModalForm';
import UserDeleteConfirmation from '../components/UserDeleteConfirmation';
import Table from '../../../components/Table';

const Users = () => {
  const headings = ['Name', 'Last Name', 'Email', 'Gender', 'Role'];
  const properties: UserProperties[] = [
    'name',
    'lastName',
    'email',
    'gender',
    'role',
  ];

  const [users, setUsers] = useState<User[]>([]);

  const { isModalHidden, modalType } = useUserContext();

  useEffect(() => {
    fetchUsers().then((res) => setUsers(res.data));
  }, [isModalHidden]);

  return (
    <>
      <Modal title={`${modalType} user`}>
        {modalType === 'delete' ? (
          <UserDeleteConfirmation />
        ) : (
          <UserModalForm />
        )}
      </Modal>
      <Layout page='users'>
        <Table data={users} headings={headings} properties={properties} />
      </Layout>
    </>
  );
};

export default Users;
