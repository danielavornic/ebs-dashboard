import { Link } from 'react-router-dom';

import RegisterCard from '../components/RegisterCard';

const Register = () => (
  <div className='auth-page-container'>
    <main>
      <h1>Welcome to EBS Dashboard</h1>
      <RegisterCard />
      <p className='switch-auth'>
        Already a member? <Link to={'/login'}>Login</Link>
      </p>
    </main>
  </div>
);

export default Register;
