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
  userId: number;
}

export type User = UserInterface | null;
