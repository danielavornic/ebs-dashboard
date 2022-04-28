import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { BrowserRouter } from 'react-router-dom';

import { User } from './types/user.types';
import { getUserById } from './api/users';

import AppRoutes from './routes';

export const UserContext = createContext<
  [User, Dispatch<SetStateAction<User>>]
>([null, () => {}]);

const App: React.FC = () => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('userId') || 'null');
    if (userId) {
      getUserById(userId).then((user) => setUser(user));
    } else {
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
