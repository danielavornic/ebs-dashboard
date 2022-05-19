import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { PostActions } from 'types/post';

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
      <Route element={<PublicRoute />}>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/users' element={<Users />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/posts/:id' element={<Post action={PostActions.View} />} />
        <Route
          path='/posts/:id/edit'
          element={<Post action={PostActions.Edit} title='Edit post' />}
        />
        <Route
          path='/posts/create'
          element={<Post action={PostActions.Create} title='Create post' />}
        />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
