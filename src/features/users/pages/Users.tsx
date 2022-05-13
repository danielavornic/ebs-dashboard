import { useEffect, useState } from 'react';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';

import { User, UserInterface, UserModalType, UserRole } from 'types/user';
import {
  deleteUser,
  fetchUsers,
  getUserByEmail,
  registerUser,
  updateUser,
} from 'api/users';
import useUserContext from 'hooks/useUserContext';

import {
  Button,
  ConfirmationModalContent,
  Modal,
  PageTitleBar,
  Spinner,
} from 'components/index';
import UserModalForm from '../components/UserModalForm';
import UsersTable from '../components/UsersTable';

interface Columns {
  title: string;
  dataIndex: keyof UserInterface;
  render?: (obj: User) => JSX.Element;
}

interface ModalInterface {
  title: string;
  isHidden: boolean;
  type: UserModalType;
  user: User;
}

const Users = () => {
  const { user } = useUserContext();

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [modal, setModal] = useState<ModalInterface>({
    title: '',
    isHidden: true,
    type: UserModalType.Add,
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
    if (modal.type === UserModalType.Add && formUser) {
      const existingUser = await getUserByEmail(formUser.email);
      if (existingUser) {
        alert('User registered with this email already exists.');
        return;
      }

      await registerUser(formUser);
    }

    if (modal.type === UserModalType.Edit && formUser) {
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
                type: UserModalType.Edit,
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
                type: UserModalType.Delete,
                user: userRow,
              })
            }
          />
        </>
      ),
    },
  ];

  if (user?.role !== UserRole.Admin) {
    columns.pop();
  }

  return (
    <>
      <Modal
        title={modal.title}
        hidden={modal.isHidden}
        toggleModal={toggleModal}
      >
        {modal.type === UserModalType.Delete ? (
          <ConfirmationModalContent
            title='Are you sure you want to delete this user?'
            buttonText='Delete'
            onConfirm={handleUserDelete}
          />
        ) : (
          <UserModalForm
            data={modal.user as UserInterface}
            buttonText={
              modal.type === UserModalType.Add ? 'Add user' : 'Save changes'
            }
            userAction={handleSubmitUserForm}
          />
        )}
      </Modal>
      <PageTitleBar title='Users'>
        {user?.role === UserRole.Admin && (
          <Button
            state='primary'
            type='button'
            size='medium'
            icon={<FiPlus />}
            onClick={() =>
              setModal({
                title: 'Add User',
                isHidden: false,
                type: UserModalType.Add,
                user: null,
              })
            }
          >
            Add user
          </Button>
        )}
      </PageTitleBar>
      {isLoading ? <Spinner /> : <UsersTable columns={columns} data={users} />}
    </>
  );
};

export default Users;
