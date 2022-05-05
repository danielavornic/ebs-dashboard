import { Link } from 'react-router-dom';

import LoginCard from '../components/LoginCard';

const Login = () => (
  <div className='fullscreen-page'>
    <div>
      <h1>Welcome back to EBS Dashboard</h1>
      <LoginCard />
      <p>
        Don't have an account yet? <Link to={'/register'}>Register</Link>
      </p>
    </div>
  </div>
);

export default Login;
