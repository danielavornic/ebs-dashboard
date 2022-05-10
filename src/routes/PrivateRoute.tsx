import { Navigate, Outlet } from 'react-router-dom';

import useUserContext from '../hooks/useUserContext';
import { Layout } from 'components';

const PrivateRoute = () => {
  const { isLogged } = useUserContext();

  return isLogged ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
