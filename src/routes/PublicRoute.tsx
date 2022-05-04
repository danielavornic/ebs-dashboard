import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import useUserContext from 'hooks/useUserContext';

const PublicRoute: FC<{ component: FC }> = ({ component: Component }) => {
  const { isLogged } = useUserContext();

  if (!isLogged) return <Component />;
  return <Navigate to='/dashboard' />;
};

export default PublicRoute;
