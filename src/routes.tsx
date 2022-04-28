import { FC, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { UserContext } from './App';

import Dashboard from './features/auth/Dashboard';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';

interface RoutePropTypes {
  component: FC;
  isUserLogged: boolean;
}

const PrivateRoute: FC<RoutePropTypes> = ({
  component: Component,
  isUserLogged,
}) => {
  if (isUserLogged) return <Component />;
  return <Navigate to='/login' />;
};

const PublicRoute: FC<RoutePropTypes> = ({
  component: Component,
  isUserLogged,
}) => {
  if (!isUserLogged) return <Component />;
  return <Navigate to='/dashboard' />;
};

const AppRoutes = () => {
  const [user] = useContext(UserContext);
  const isUserLogged = !!user;
  return (
    <Routes>
      <Route
        path='/'
        element={<PublicRoute component={Login} isUserLogged={isUserLogged} />}
      />
      <Route
        path='/register'
        element={
          <PublicRoute component={Register} isUserLogged={isUserLogged} />
        }
      />
      <Route
        path='/login'
        element={<PublicRoute component={Login} isUserLogged={isUserLogged} />}
      />
      <Route
        path='/dashboard'
        element={
          <PrivateRoute component={Dashboard} isUserLogged={isUserLogged} />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
