import { createContext, Dispatch, SetStateAction } from 'react';
import { User } from './types/user.types';

export type ModalType = 'add' | 'edit' | 'delete';

interface StateInterface {
  user: User;
  isLogged: boolean;
  isModalHidden: boolean;
  modalType: ModalType;
  selectedUser: User;
  setUser: Dispatch<SetStateAction<User>>;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  setIsModalHidden: Dispatch<SetStateAction<boolean>>;
  setModalType: Dispatch<SetStateAction<ModalType>>;
  setSelectedUser: Dispatch<SetStateAction<User>>;
}

export const UserContext = createContext<StateInterface>({
  user: null,
  isLogged: false,
  isModalHidden: true,
  modalType: 'add',
  selectedUser: null,
  setUser: () => {},
  setIsLogged: () => {},
  setIsModalHidden: () => {},
  setModalType: () => {},
  setSelectedUser: () => {},
});
