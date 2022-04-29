export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  lastName: string;
  gender: string;
  confirmPassword: string;
}

export interface UserInterface extends RegisterCredentials {
  id: string;
  role: Role;
}

export interface UserModalData {
  name: string;
  lastName: string;
  email: string;
  gender: string;
  role: Role;
}

export type Role = 'moderator' | 'admin' | null;

export type User = UserInterface | null;

export type UserProperties = 'name' | 'lastName' | 'email' | 'gender';
