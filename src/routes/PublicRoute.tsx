import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import useUserContext from 'hooks/useUserContext';

const PublicRoute = ({
  component: Component,
}: {
  component: ComponentType;
}) => {
  const { isLogged } = useUserContext();

  if (!isLogged) return <Component />;
  return <Navigate to='/dashboard' />;
};

export default PublicRoute;
