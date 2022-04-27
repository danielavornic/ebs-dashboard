import Button from '../../../components/Button';
import Input from '../../../components/Input';
import '../../../styles/AuthCard.scss';

const RegisterCard = () => {
  return (
    <div className='auth-card'>
      <h2>Register</h2>
      <p>Enter your details to create your account.</p>
      <form>
        <Input type='text' placeholder='Name' id='name' />
        <Input type='text' placeholder='Surname' id='surname' />
        <Input type='email' placeholder='E-mail' id='email' />
        <select name='gender' id='gender' required>
          <option value='' disabled selected>
            Gender
          </option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='none'>Prefer not to say</option>
        </select>
        <Input type='password' placeholder='Password' id='password' />
        <Input
          type='password'
          placeholder='Confirm password'
          id='confirm-password'
        />
        <Input type='checkbox' id='terms' />
        <label htmlFor='terms'>
          I agree to the processing of personal data
        </label>
        <Button type='submit' state='primary'>
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegisterCard;
