import { Navigate, Outlet } from 'react-router-dom';

import useUserContext from 'hooks/useUserContext';

const PublicRoute = () => {
  const { isLogged } = useUserContext();

  return isLogged ? <Navigate to='/dashboard' /> : <Outlet />;
};

export default PublicRoute;
