import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from './types/user';

interface StateInterface {
  user: User;
  isLogged: boolean;
  setUser: Dispatch<SetStateAction<User>>;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<StateInterface>({
  user: null,
  isLogged: false,
  setUser: () => {},
  setIsLogged: () => {},
});
