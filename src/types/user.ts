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
  id: number;
  role: UserRole;
  actions?: string;
}

export interface UserModalData {
  name: string;
  lastName: string;
  email: string;
  gender: string;
  role: UserRole;
}

export enum UserRole {
  Moderator = 'moderator',
  Admin = 'administrator',
}

export enum UserModalType {
  Add = 'add',
  Edit = 'update',
  Delete = 'delete',
}

export type User = UserInterface | null;
