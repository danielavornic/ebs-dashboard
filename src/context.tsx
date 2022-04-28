import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from './types/user.types';

interface StateInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<StateInterface>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
});
