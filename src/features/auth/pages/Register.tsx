import { Link } from 'react-router-dom';

import RegisterCard from '../components/RegisterCard';

import '../../../styles/AuthPage.scss';

const Register = () => (
  <div className='page-container'>
    <div className='content'>
      <h1>Welcome to EBS Dashboard</h1>
      <RegisterCard />
      <p className='switch-auth'>
        Already a member? <Link to={'/login'}>Login</Link>
      </p>
    </div>
  </div>
);

export default Register;
