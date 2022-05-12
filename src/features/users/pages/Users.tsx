import { useEffect, useState } from 'react';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';

import { User, UserInterface } from 'types/user';
import useUserContext from 'hooks/useUserContext';
import {
  deleteUser,
  fetchUsers,
  getUserByEmail,
  registerUser,
  updateUser,
} from 'api/users';

import {
  Button,
  ConfirmationModalContent,
  Modal,
  PageTitleBar,
  Spinner,
  Table,
} from 'components/index';
import UserModalForm from '../components/UserModalForm';

interface Columns {
  title: string;
  dataIndex: keyof UserInterface;
  render?: (obj: User) => JSX.Element;
}

interface ModalInterface {
  title: string;
  isHidden: boolean;
  type: 'add' | 'edit' | 'delete';
  user: User;
}

const Users = () => {
  const { user } = useUserContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const [modal, setModal] = useState<ModalInterface>({
    title: '',
    isHidden: true,
    type: 'add',
    user: null,
  });

  const toggleModal = () => setModal({ ...modal, isHidden: !modal.isHidden });

  const handleUserDelete = async () => {
    if (modal.user) {
      await deleteUser(modal.user.id);
      await getUsers();
      setModal({
        ...modal,
        isHidden: true,
        user: null,
      });
    }
  };

  const handleSubmitUserForm = async (formUser: User) => {
    if (modal.type === 'add' && formUser) {
      const existingUser = await getUserByEmail(formUser.email);
      if (existingUser) {
        alert('User registered with this email already exists.');
        return;
      }

      await registerUser(formUser);
    }

    if (modal.type === 'edit' && formUser) {
      await updateUser(formUser.id, formUser);
    }

    await getUsers();

    setModal({
      ...modal,
      isHidden: true,
      user: null,
    });
  };

  const getUsers = async () => {
    const users = await fetchUsers();
    setUsers(users);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

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
      render: (userRow: User) => (
        <>
          <Button
            state='transparent'
            type='button'
            icon={<FiEdit2 />}
            title='Edit'
            onClick={() =>
              setModal({
                title: 'Edit User',
                isHidden: false,
                type: 'edit',
                user: userRow,
              })
            }
          />
          <Button
            state='transparent'
            type='button'
            icon={<FiTrash />}
            title='Delete'
            onClick={() =>
              setModal({
                title: 'Delete User',
                isHidden: false,
                type: 'delete',
                user: userRow,
              })
            }
          />
        </>
      ),
    },
  ];

  if (user?.role !== 'administrator') {
    columns.pop();
  }

  return (
    <>
      <Modal
        title={modal.title}
        hidden={modal.isHidden}
        toggleModal={toggleModal}
      >
        {modal.type === 'delete' ? (
          <ConfirmationModalContent
            title='Are you sure you want to delete this user?'
            buttonText='Delete'
            onConfirm={handleUserDelete}
          />
        ) : (
          <UserModalForm
            data={modal.user as UserInterface}
            buttonText={modal.type === 'add' ? 'Add user' : 'Save changes'}
            userAction={handleSubmitUserForm}
          />
        )}
      </Modal>
      <PageTitleBar title='Users'>
        {user?.role === 'administrator' && (
          <Button
            state='primary'
            type='button'
            size='medium'
            icon={<FiPlus />}
            onClick={() =>
              setModal({
                title: 'Add User',
                isHidden: false,
                type: 'add',
                user: null,
              })
            }
          >
            Add user
          </Button>
        )}
      </PageTitleBar>
      {isLoading ? <Spinner /> : <Table columns={columns} data={users} />}
    </>
  );
};

export default Users;
