import { useState } from 'react';
import { FiEdit2, FiPlus, FiTrash } from 'react-icons/fi';
import { useMutation, useQuery, useQueryClient } from 'react-query';

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
  const queryClient = useQueryClient();

  const [modal, setModal] = useState<ModalInterface>({
    title: '',
    isHidden: true,
    type: UserModalType.Add,
    user: null,
  });

  const { data: users, isLoading, isSuccess } = useQuery('users', fetchUsers);

  const onSuccess = () => {
    queryClient.invalidateQueries('users');
    setModal({
      ...modal,
      isHidden: true,
      user: null,
    });
  };

  const addUserMutation = useMutation(registerUser, {
    onSuccess,
  });

  const updateUserMutation = useMutation(updateUser, {
    onSuccess,
  });

  const deleteUserMutation = useMutation(deleteUser, {
    onSuccess,
  });

  const handleSubmitUserForm = async (formUser: User) => {
    if (modal.type === UserModalType.Add && formUser) {
      if (await getUserByEmail(formUser.email)) {
        alert('User registered with this email already exists.');
        return;
      }
      addUserMutation.mutate(formUser);
    }

    if (modal.type === UserModalType.Edit && formUser) {
      updateUserMutation.mutate(formUser);
    }
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
        toggleModal={() => setModal({ ...modal, isHidden: !modal.isHidden })}
      >
        {modal.type === UserModalType.Delete ? (
          <ConfirmationModalContent
            title='Are you sure you want to delete this user?'
            buttonText='Delete'
            onConfirm={() =>
              modal.user && deleteUserMutation.mutate(modal.user.id)
            }
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
      {isLoading && <Spinner />}
      {isSuccess && <UsersTable columns={columns} data={users} />}
    </>
  );
};

export default Users;
