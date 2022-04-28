import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Dashboard from '../features/auth/Dashboard';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<PublicRoute component={Login} />} />
      <Route path='/register' element={<PublicRoute component={Register} />} />
      <Route path='/login' element={<PublicRoute component={Login} />} />
      <Route
        path='/dashboard'
        element={<PrivateRoute component={Dashboard} />}
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
