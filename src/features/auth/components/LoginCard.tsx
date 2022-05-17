import { useQuery } from 'react-query';
import { Button, Card, Form, Input, useForm } from 'ebs-design';

import { LoginCredentials, UserInterface } from 'types/user';
import { fetchUsers } from 'api/users';
import useUserContext from 'hooks/useUserContext';
import { getLoginFieldsErrors } from 'utils/authValidation';

const LoginCard = () => {
  const [form] = useForm();

  const { setUser, setIsLogged } = useUserContext();

  const { data: users } = useQuery('users', fetchUsers);

  const handleSubmit = ({ email, password }: LoginCredentials) => {
    const { email: emailErrors, password: passwordErrors } =
      getLoginFieldsErrors(users, { email, password });

    form.setFields([
      {
        name: 'email',
        value: email,
        errors: emailErrors,
      },
      {
        name: 'password',
        value: password,
        errors: passwordErrors,
      },
    ]);

    if (emailErrors.length === 0 && passwordErrors.length === 0) {
      const user = users?.find(
        (user: UserInterface) =>
          user.email === email && user.password === password
      );
      setUser(user);
      setIsLogged(true);
      localStorage.setItem('userId', user.id);
    }
  };

  return (
    <Card size='large'>
      <Card.Header className='text-center'>
        <h2>Login</h2>
        <p>Enter your details to sign into your account.</p>
      </Card.Header>
      <Card.Body>
        <Form form={form} onFinish={handleSubmit} id='form'>
          <Form.Field
            label='E-mail'
            name='email'
            hideLabel
            initialValue=''
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type='email'
              placeholder='E-mail'
              size='medium'
              autoComplete='on'
            />
          </Form.Field>
          <Form.Field
            label='Password'
            name='password'
            hideLabel
            initialValue=''
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input
              type='password'
              placeholder='Password'
              size='medium'
              autoComplete='current-password'
              minLength={6}
            />
          </Form.Field>
          <Button
            form='form'
            submit
            size='medium'
            type='primary'
            className='w-full'
          >
            Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginCard;
