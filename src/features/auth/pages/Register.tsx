import { Link } from 'react-router-dom';
import { Space } from 'ebs-design';

import RegisterCard from '../components/RegisterCard';

const Register = () => (
  <Space align='center' justify='center' className='h-100vh'>
    <div>
      <RegisterCard />
      <p className='mt-24 text-center'>
        Already a member? <Link to={'/login'}>Login</Link>
      </p>
    </div>
  </Space>
);

export default Register;
