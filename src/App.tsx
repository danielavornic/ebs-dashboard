import { useEffect, useState } from 'react';

import { User } from './types/user.types';
import { getUserById } from './api/users';
import { UserContext } from './context';

import AppRoutes from './routes/routes';

const App: React.FC = () => {
  const [user, setUser] = useState<User>(null);
  const [isLogged, setIsLogged] = useState<boolean>(true);
  const [isModalHidden, setIsModalHidden] = useState<boolean>(true);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedUser, setSelectedUser] = useState<User>(null);

  const value = {
    user,
    isLogged,
    isModalHidden,
    modalType,
    selectedUser,
    setUser,
    setIsLogged,
    setIsModalHidden,
    setModalType,
    setSelectedUser,
  };

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
    <UserContext.Provider value={value}>
      <AppRoutes />
    </UserContext.Provider>
  );
};

export default App;
