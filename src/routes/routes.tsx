import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Login from 'features/auth/pages/Login';
import Register from 'features/auth/pages/Register';
import Dashboard from 'features/dashboard/pages/Dashboard';
import Users from 'features/users/pages/Users';
import Posts from 'features/posts/pages/Posts';
import Post from 'features/posts/pages/Post';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<PublicRoute element={<Login />} />} />
      <Route
        path='/register'
        element={<PublicRoute element={<Register />} />}
      />
      <Route path='/login' element={<PublicRoute element={<Login />} />} />
      <Route
        path='/dashboard'
        element={<PrivateRoute element={<Dashboard />} />}
      />
      <Route path='/users' element={<PrivateRoute element={<Users />} />} />
      <Route path='/posts' element={<PrivateRoute element={<Posts />} />} />
      <Route
        path='/posts/create'
        element={
          <PrivateRoute
            element={<Post action='create' title='Create Post' />}
          />
        }
      />
      <Route
        path='/posts/:id'
        element={<PrivateRoute element={<Post action='view' />} />}
      />
      <Route
        path='/posts/:id/edit'
        element={
          <PrivateRoute element={<Post action='edit' title='Edit Post' />} />
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
