import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { User } from 'types/user';
import { getUserById } from 'api/users';
import { UserContext } from 'context';

import AppRoutes from 'routes/routes';

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState<User>(null);
  const [isLogged, setIsLogged] = useState(true);

  const value = {
    user,
    isLogged,
    setUser,
    setIsLogged,
  };

  const userId = JSON.parse(localStorage.getItem('userId') || 'null');

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserById(userId);
      setUser(user);
    };

    if (userId) {
      getUser();
      setIsLogged(true);
    } else {
      setUser(null);
      setIsLogged(false);
    }
  }, [userId]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={value}>
        <AppRoutes />
      </UserContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
