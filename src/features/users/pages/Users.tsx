import { useEffect, useState } from 'react';

import { User, UserProperties } from 'types/user';
import { deleteUser, fetchUsers } from 'api/users';
import useUserContext from 'hooks/useUserContext';

import Layout from 'components/Layout/Layout';
import Modal from 'components/Modal';
import Table from 'components/Table';
import UserModalForm from '../components/UserModalForm';
import ConfirmationModalContent from 'components/ConfirmationModalContent';

const Users = () => {
  const headings = ['Name', 'Last Name', 'Email', 'Gender', 'Role'];
  const properties: UserProperties[] = [
    'name',
    'lastName',
    'email',
    'gender',
    'role',
  ];

  const {
    isModalHidden,
    modalType,
    selectedUser,
    setIsModalHidden,
    setModalType,
    setSelectedUser,
  } = useUserContext();
  const [users, setUsers] = useState<User[]>([]);

  const handleUserDelete = async () => {
    if (selectedUser && selectedUser.id !== '') {
      await deleteUser(parseInt(selectedUser.id));
      setIsModalHidden(true);
    }
  };

  const handleAddUser = () => {
    setIsModalHidden(false);
    setModalType('add');
    setSelectedUser(null);
  };

  const getUsers = async () => {
    const users = await fetchUsers();
    setUsers(users);
  };

  useEffect(() => {
    if (isModalHidden) getUsers();
  }, [isModalHidden]);

  return (
    <>
      <Modal title={`${modalType} user`}>
        {modalType === 'delete' ? (
          <ConfirmationModalContent
            title='Are you sure you want to delete this user?'
            onConfirm={handleUserDelete}
          />
        ) : (
          <UserModalForm />
        )}
      </Modal>
      <Layout page='users' onButtonClick={handleAddUser}>
        <Table data={users} headings={headings} properties={properties} />
      </Layout>
    </>
  );
};

export default Users;
