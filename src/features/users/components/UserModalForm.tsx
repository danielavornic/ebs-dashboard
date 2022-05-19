import { useQuery } from 'react-query';
import { Button, Form, Input, Modal, Select, Space, useForm } from 'ebs-design';

import { User, UserInterface, UserModalData, UserRole } from 'types/user';
import { fetchUsers } from 'api/users';

const defaultUser: UserModalData = {
  name: '',
  lastName: '',
  email: '',
  gender: '',
  role: UserRole.Moderator,
};

interface Props {
  data: UserInterface;
  buttonText: string;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}

const UserModalForm = ({ data, onSubmit, buttonText, onCancel }: Props) => {
  const [form] = useForm();

  const { data: users } = useQuery('users', fetchUsers);

  const { email: initialEmail } = data || defaultUser;

  const handleSubmit = (values: UserModalData) => {
    const userWithEmail = users?.find(
      (user: UserInterface) => user.email === values.email
    );

    if (userWithEmail && userWithEmail.email !== initialEmail) {
      form.setFields([
        {
          name: 'email',
          errors: ['Another user with this email already exists'],
        },
      ]);
      return;
    }

    onSubmit({ ...values, id: data?.id } as User);
  };

  return (
    <>
      <Modal.Content>
        <Form
          form={form}
          id='userForm'
          onFinish={handleSubmit}
          initialValues={{
            name: data?.name || '',
            lastName: data?.lastName || '',
            email: data?.email || '',
            gender: data?.gender || '',
            role: data?.role || '',
          }}
        >
          <Form.Field
            label='Name'
            name='name'
            hideLabel
            rules={[{ required: true }]}
          >
            <Input
              type='text'
              placeholder='First Name'
              size='medium'
              autoComplete='on'
            />
          </Form.Field>
          <Form.Field
            label='Last Name'
            name='lastName'
            hideLabel
            rules={[{ required: true }]}
          >
            <Input
              size='medium'
              type='text'
              placeholder='Last Name'
              autoComplete='on'
            />
          </Form.Field>
          <Form.Field
            label='E-mail'
            name='email'
            hideLabel
            rules={[{ required: true }]}
          >
            <Input
              type='email'
              placeholder='E-mail'
              size='medium'
              autoComplete='on'
            />
          </Form.Field>
          <Form.Field
            label='Gender'
            name='gender'
            hideLabel
            rules={[{ required: true }]}
          >
            <Select
              options={[
                {
                  text: 'Male',
                  value: 'Male',
                },
                {
                  text: 'Female',
                  value: 'Female',
                },
                {
                  text: 'Prefer not to say',
                  value: 'Prefer not to say',
                },
              ]}
              placeholder='Gender'
            />
          </Form.Field>
          <Form.Field
            label='Role'
            name='role'
            hideLabel
            rules={[{ required: true }]}
          >
            <Select
              options={[
                {
                  text: 'Moderator',
                  value: UserRole.Moderator,
                },
                {
                  text: 'Admin',
                  value: UserRole.Admin,
                },
              ]}
              placeholder='Role'
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Footer>
        <Space justify='space-between'>
          <Button type='ghost' onClick={onCancel}>
            Cancel
          </Button>
          <Button type='primary' form='userForm' submit>
            {buttonText}
          </Button>
        </Space>
      </Modal.Footer>
    </>
  );
};

export default UserModalForm;
