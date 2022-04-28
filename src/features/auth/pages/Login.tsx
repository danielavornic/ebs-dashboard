import { Link } from 'react-router-dom';

import LoginCard from '../components/LoginCard';

import '../../../styles/AuthPage.scss';

const Login = () => (
  <div className='page-container'>
    <div className='content'>
      <h1>Welcome back to EBS Dashboard</h1>
      <LoginCard />
      <p className='switch-auth'>
        Don't have an account yet? <Link to={'/register'}>Register</Link>
      </p>
    </div>
  </div>
);

export default Login;
