import {
  LoginCredentials,
  RegisterCredentials,
  UserInterface,
} from 'types/user';

export const getUserByEmail = (users: UserInterface[], email: string) =>
  users?.find((user: UserInterface) => user.email === email);

const getUserByPassword = (users: UserInterface[], password: string) =>
  users?.find((user: UserInterface) => user.password === password);

export const getLoginFieldsErrors = (
  users: UserInterface[],
  values: LoginCredentials
) => {
  let errors: {
    email: string[];
    password: string[];
  } = {
    email: [],
    password: [],
  };

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email.push('Invalid email address');
  } else if (!!!getUserByEmail(users, values.email)) {
    errors.email.push('Email not found');
  } else if (!!!getUserByPassword(users, values.password)) {
    errors.password.push('Wrong password');
  }

  return errors;
};

export const getRegisterFieldsErrors = (
  users: UserInterface[],
  values: RegisterCredentials
) => {
  let errors: {
    email: string[];
    password: string[];
    confirmPassword: string[];
  } = {
    email: [],
    password: [],
    confirmPassword: [],
  };

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email.push('Invalid email address');
  } else if (getUserByEmail(users, values.email)) {
    errors.email.push('Email already exists');
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword.push('Passwords do not match');
  }

  return errors;
};
