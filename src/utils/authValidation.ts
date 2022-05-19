import {
  LoginCredentials,
  RegisterCredentials,
  UserInterface,
} from 'types/user';

export const getUserByEmail = (users: UserInterface[], email: string) =>
  users?.find((user: UserInterface) => user.email === email);

const getUserByPassword = (users: UserInterface[], password: string) =>
  users?.find((user: UserInterface) => user.password === password);

const isEmailValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const getLoginFieldsErrors = (
  users: UserInterface[],
  values: LoginCredentials
) => {
  const { email, password } = values;
  let errors: { [key: string]: string[] } = {
    email: [],
    password: [],
  };

  if (!isEmailValid(email)) {
    errors.email.push('Invalid email address');
  } else if (!!!getUserByEmail(users, email)) {
    errors.email.push('User registered with this email was not found');
  }

  if (!!!getUserByPassword(users, password)) {
    errors.password.push('Wrong password');
  }

  return errors;
};

export const getRegisterFieldsErrors = (
  users: UserInterface[],
  values: RegisterCredentials
) => {
  const { email, password, confirmPassword, terms } = values;
  let errors: { [key: string]: string[] } = {
    email: [],
    password: [],
    confirmPassword: [],
    terms: [],
  };

  if (!isEmailValid(email)) {
    errors.email.push('Invalid email address');
  }
  if (getUserByEmail(users, email)) {
    errors.email.push('User registered with this email already exists');
  }

  if (password !== confirmPassword) {
    errors.confirmPassword.push('Passwords do not match');
  }

  if (!!!terms) {
    errors.terms.push('You must agree with terms and conditions');
  }

  return errors;
};
