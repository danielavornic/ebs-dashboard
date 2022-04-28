import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { User } from './types/user.types';
import { getUserById } from './api/users';

import AppRoutes from './routes/routes';

interface StateInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  isLogged: boolean;
}

export const UserContext = createContext<StateInterface>({
  user: null,
  setUser: () => {},
  isLogged: false,
});

const App: React.FC = () => {
  const [user, setUser] = useState<User>(null);
  const [isLogged, setIsLogged] = useState<boolean>(true);

  const userId = JSON.parse(localStorage.getItem('userId') || 'null');

  useEffect(() => {
    if (userId) {
      getUserById(userId).then((user) => setUser(user));
      setIsLogged(true);
    } else {
      setUser(null);
      setIsLogged(false);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ user, setUser, isLogged }}>
      <AppRoutes />
    </UserContext.Provider>
  );
};

export default App;
