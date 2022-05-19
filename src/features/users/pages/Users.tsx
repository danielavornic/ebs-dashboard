import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Button,
  ColumnType,
  Icon,
  Loader,
  Modal,
  Space,
  Table,
} from 'ebs-design';

import { User, UserInterface, UserModalType, UserRole } from 'types/user';
import { deleteUser, fetchUsers, registerUser, updateUser } from 'api/users';
import useUserContext from 'hooks/useUserContext';

import { ConfirmationModalContent, PageTitleBar } from 'components/index';
import UserModalForm from '../components/UserModalForm';

interface ModalInterface {
  title: string;
  isOpen: boolean;
  type: UserModalType;
  user: User;
}

const initialModal = {
  title: '',
  isOpen: false,
  type: UserModalType.Add,
  user: null,
};

const Users = () => {
  const { user } = useUserContext();
  const queryClient = useQueryClient();

  const [modal, setModal] = useState<ModalInterface>(initialModal);
  const hideModal = () => setModal({ ...modal, isOpen: false });

  const { data: users, isLoading, isSuccess } = useQuery('users', fetchUsers);

  const onSuccess = () => {
    queryClient.invalidateQueries('users');
    setModal(initialModal);
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

  const handleSubmitUserForm = (formUser: User) => {
    if (modal.type === UserModalType.Add) {
      addUserMutation.mutate(formUser as UserInterface);
    }

    if (modal.type === UserModalType.Edit) {
      updateUserMutation.mutate(formUser as UserInterface);
    }
  };

  let columns: ColumnType<object>[] = [
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
      width: 50,
      render: (value: any, record: object, index: number) => (
        <Space justify='space-around'>
          <Button
            type='ghost'
            icon='edit'
            size='small'
            title='Edit'
            onClick={() => {
              setModal({
                title: 'Edit User',
                isOpen: true,
                type: UserModalType.Edit,
                user: record as User,
              });
            }}
          />
          <Button
            type='ghost'
            icon='close'
            title='Delete'
            size='small'
            onClick={() =>
              setModal({
                title: 'Delete User',
                isOpen: true,
                type: UserModalType.Delete,
                user: record as User,
              })
            }
          />
        </Space>
      ),
    },
  ];

  if (user?.role !== UserRole.Admin) {
    columns.pop();
  }

  return (
    <>
      <Modal
        closeOnClickOutside
        onClose={hideModal}
        title={modal.title}
        open={modal.isOpen}
        size='small'
      >
        {modal.type === UserModalType.Delete ? (
          <ConfirmationModalContent
            title='Are you sure you want to delete this user?'
            buttonText='Delete'
            onConfirm={() => {
              modal.user && deleteUserMutation.mutate(modal.user.id);
              hideModal();
            }}
            onCancel={hideModal}
          />
        ) : (
          <UserModalForm
            data={modal.user as UserInterface}
            buttonText={
              modal.type === UserModalType.Add ? 'Add user' : 'Save changes'
            }
            onSubmit={handleSubmitUserForm}
            onCancel={hideModal}
          />
        )}
      </Modal>
      <PageTitleBar title='Users'>
        {user?.role === UserRole.Admin && (
          <Button
            type='primary'
            size='medium'
            prefix={<Icon type='create' />}
            onClick={() =>
              setModal({
                title: 'Add User',
                isOpen: true,
                type: UserModalType.Add,
                user: null,
              })
            }
          >
            Add user
          </Button>
        )}
      </PageTitleBar>
      {isLoading && <Loader loading />}
      {isSuccess && <Table columns={columns} data={users} />}
    </>
  );
};

export default Users;
