import { Navigate, Outlet } from 'react-router-dom';

import useUserContext from '../hooks/useUserContext';
import { PanelLayout } from 'components';

const PrivateRoute = () => {
  const { isLogged } = useUserContext();

  return isLogged ? (
    <PanelLayout>
      <Outlet />
    </PanelLayout>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoute;
