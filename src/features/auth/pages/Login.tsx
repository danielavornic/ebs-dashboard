import { Space } from 'ebs-design';
import { Link } from 'react-router-dom';

import LoginCard from '../components/LoginCard';

const Login = () => (
  <Space align='center' justify='center' className='h-100vh'>
    <div>
      <LoginCard />
      <p className='mt-24 text-center'>
        Don't have an account yet? <Link to={'/register'}>Register</Link>
      </p>
    </div>
  </Space>
);

export default Login;
