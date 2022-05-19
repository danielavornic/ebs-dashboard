import { useMutation, useQuery } from 'react-query';
import { Card, Form, Input, Select, Button, useForm, Radio } from 'ebs-design';

import { RegisterCredentials, UserRole } from 'types/user';
import { registerUser, fetchUsers } from 'api/users';
import useUserContext from 'hooks/useUserContext';
import { getRegisterFieldsErrors } from 'utils/authValidation';

const RegisterCard = () => {
  const [form] = useForm();

  const { setUser, setIsLogged } = useUserContext();

  const { data: users } = useQuery('users', fetchUsers);

  const registerUserMutation = useMutation(registerUser, {
    onSuccess: ({ data: user }) => {
      setUser(user);
      setIsLogged(true);
      localStorage.setItem('userId', user.id);
    },
  });

  const handleSubmit = (userCredentials: RegisterCredentials) => {
    const {
      email: emailErrors,
      password: passErrors,
      confirmPassword: confirmPassErrors,
      terms: termsErrors,
    } = getRegisterFieldsErrors(users, userCredentials);

    if (emailErrors.length || passErrors.length || confirmPassErrors.length) {
      form.setFields([
        {
          name: 'email',
          errors: emailErrors,
        },
        {
          name: 'password',
          errors: passErrors,
        },
        {
          name: 'confirmPassword',
          errors: confirmPassErrors,
        },
        {
          name: 'terms',
          errors: termsErrors,
        },
      ]);
      return;
    }

    delete userCredentials.terms;
    delete userCredentials.confirmPassword;
    registerUserMutation.mutate({
      ...userCredentials,
      role: UserRole.Moderator,
    });
  };

  return (
    <Card size='large'>
      <Card.Header className='text-center'>
        <h2>Register</h2>
        <p>Enter your details to create your account.</p>
      </Card.Header>
      <Card.Body>
        <Form
          form={form}
          id='registerForm'
          onFinish={handleSubmit}
          initialValues={{
            name: '',
            lastName: '',
            email: '',
            gender: '',
            password: '',
            confirmPassword: '',
            terms: false,
          }}
        >
          <Form.Field
            label='Name'
            name='name'
            hideLabel
            rules={[{ required: true }]}
          >
            <Input
              type='name'
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
              type='name'
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
            label='Password'
            name='password'
            hideLabel
            rules={[{ required: true }]}
          >
            <Input
              type='password'
              placeholder='Password'
              size='medium'
              autoComplete='current-password'
              minLength={6}
            />
          </Form.Field>
          <Form.Field
            label='Confirm Password'
            name='confirmPassword'
            hideLabel
            rules={[{ required: true }]}
          >
            <Input
              type='password'
              placeholder='Confirm password'
              size='medium'
              autoComplete='confirm-password'
              minLength={6}
            />
          </Form.Field>
          <Form.Field
            label='Processing Data Terms'
            name='terms'
            hideLabel
            rules={[{ required: true }]}
          >
            <Radio
              options={[
                {
                  text: 'I agree to the processing of personal data',
                  value: 0,
                },
              ]}
            />
          </Form.Field>
          <Button
            form='registerForm'
            submit
            size='medium'
            type='primary'
            className='w-full'
          >
            Register
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RegisterCard;
