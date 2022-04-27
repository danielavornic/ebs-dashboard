import { FC } from 'react';
import { Link } from 'react-router-dom';

import '../../../styles/AuthPage.scss';
import LoginCard from '../components/LoginCard';

const Login: FC = () => {
  return (
    <div className='page-container'>
      <div className='content'>
        <h1>Welcome to EBS Dashboard</h1>
        <LoginCard />
        <p className='switch-auth'>
          Don't have an account yet? <Link to={'/register'}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
