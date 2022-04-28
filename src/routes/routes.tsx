import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Dashboard from '../features/auth/Dashboard';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Users from '../features/auth/users/pages/Users';

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
      <Route path='/users' element={<PrivateRoute component={Users} />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
