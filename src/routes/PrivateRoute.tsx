import { Navigate, RouteProps } from 'react-router-dom';

import useUserContext from '../hooks/useUserContext';
import { Layout } from 'components';

const PrivateRoute = ({ element }: RouteProps) => {
  const { isLogged } = useUserContext();

  if (isLogged) return <Layout>{element}</Layout>;
  return <Navigate to='/login' />;
};

export default PrivateRoute;
