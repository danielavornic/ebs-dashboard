export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  lastName: string;
  gender: string;
  confirmPassword?: string;
}

export interface UserInterface extends RegisterCredentials {
  id: string;
  role: Role;
  actions?: string;
}

export interface UserModalData {
  name: string;
  lastName: string;
  email: string;
  gender: string;
  role: Role;
}

export type Role = 'moderator' | 'administrator';

export type User = UserInterface | null;
