import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import useUserContext from '../hooks/useUserContext';

const PublicRoute: FC<{ component: FC }> = ({ component: Component }) => {
  const [user] = useUserContext();

  if (!!!user) return <Component />;
  return <Navigate to='/dashboard' />;
};

export default PublicRoute;
