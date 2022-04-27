import Button from '../../../components/Button';
import Input from '../../../components/Input';
import '../../../styles/AuthCard.scss';

const LoginCard = () => {
  return (
    <div className='auth-card'>
      <h2>Login</h2>
      <p>Enter your details to sign in into your account.</p>
      <form>
        <Input type='email' name='email' placeholder='E-mail' id='email' />
        <Input
          type='password'
          name='password'
          placeholder='Password'
          id='password'
        />
        <Button type='submit' state='primary'>
          Log in
        </Button>
      </form>
    </div>
  );
};

export default LoginCard;
