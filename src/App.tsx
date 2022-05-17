import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import { User } from 'types/user';
import { getUserById } from 'api/users';
import { UserContext } from 'context';

import AppRoutes from 'routes/routes';

const App = () => {
  const userId = JSON.parse(localStorage.getItem('userId') || 'null');

  const [, setUser] = useState<User>(null);
  const [isLogged, setIsLogged] = useState(!!userId);

  const { data: user } = useQuery('user', () => getUserById(userId), {
    enabled: !!userId,
  });

  useEffect(() => setIsLogged(!!userId), [userId]);

  return (
    <UserContext.Provider value={{ user, isLogged, setUser, setIsLogged }}>
      <AppRoutes />
    </UserContext.Provider>
  );
};

export default App;
