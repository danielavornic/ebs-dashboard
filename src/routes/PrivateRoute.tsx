import Layout from 'components/Layout/Layout';
import { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import useUserContext from '../hooks/useUserContext';

const PrivateRoute = ({
  component: Component,
}: {
  component: ComponentType;
}) => {
  const { isLogged } = useUserContext();

  if (isLogged)
    return (
      <Layout>
        <Component />
      </Layout>
    );
  return <Navigate to='/login' />;
};

export default PrivateRoute;
