import { Route, Routes } from 'react-router-dom';

import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
