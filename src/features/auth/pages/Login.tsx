import { Link } from 'react-router-dom';

import LoginCard from '../components/LoginCard';

const Login = () => (
  <div className='auth-page-container'>
    <main>
      <h1>Welcome back to EBS Dashboard</h1>
      <LoginCard />
      <p className='switch-auth'>
        Don't have an account yet? <Link to={'/register'}>Register</Link>
      </p>
    </main>
  </div>
);

export default Login;
