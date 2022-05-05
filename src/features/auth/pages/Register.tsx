import { Link } from 'react-router-dom';

import RegisterCard from '../components/RegisterCard';

const Register = () => (
  <div className='fullscreen-page'>
    <div>
      <h1>Welcome to EBS Dashboard</h1>
      <RegisterCard />
      <p>
        Already a member? <Link to={'/login'}>Login</Link>
      </p>
    </div>
  </div>
);

export default Register;
