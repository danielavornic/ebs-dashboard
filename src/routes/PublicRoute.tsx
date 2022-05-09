import { Navigate, RouteProps } from 'react-router-dom';

import useUserContext from 'hooks/useUserContext';

const PublicRoute = ({ element }: RouteProps) => {
  const { isLogged } = useUserContext();

  if (!isLogged) return <>{element}</>;
  return <Navigate to='/dashboard' />;
};

export default PublicRoute;
