import { useEffect, useState } from 'react';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';

import { User, UserInterface } from 'types/user';
import { deleteUser, fetchUsers } from 'api/users';
import useUserContext from 'hooks/useUserContext';
import { ModalType } from 'context';

import Modal from 'components/Modal';
import PageTitleBar from 'components/Layout/PageTitleBar';
import Button from 'components/Button';
import Table from 'components/Table';
import UserModalForm from '../components/UserModalForm';
import ConfirmationModalContent from 'components/ConfirmationModalContent';

interface Columns {
  title: string;
  dataIndex: keyof UserInterface;
  render?: (obj: User) => JSX.Element;
}

const Users = () => {
  const {
    isModalHidden,
    modalType,
    selectedUser,
    user,
    setIsModalHidden,
    setModalType,
    setSelectedUser,
  } = useUserContext();
  const [users, setUsers] = useState<User[]>([]);

  const handleActionClick = (user: User, action: ModalType) => {
    setIsModalHidden(false);
    setModalType(action);
    setSelectedUser(user);
  };

  let columns: Columns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (user: User) => (
        <>
          <Button
            state='transparent'
            type='button'
            icon={<FiEdit2 />}
            title='Edit'
            onClick={() => handleActionClick(user, 'edit')}
          />
          <Button
            state='transparent'
            type='button'
            icon={<FiTrash />}
            title='Delete'
            onClick={() => handleActionClick(user, 'delete')}
          />
        </>
      ),
    },
  ];

  if (user && user.role !== 'administrator') {
    columns.pop();
  }

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
      <PageTitleBar title='Users'>
        {user && user.role === 'administrator' && (
          <Button
            state='primary'
            type='button'
            size='medium'
            icon={<FiPlus />}
            onClick={handleAddUser}
          >
            Add user
          </Button>
        )}
      </PageTitleBar>
      <Table columns={columns} data={users} />
    </>
  );
};

export default Users;
