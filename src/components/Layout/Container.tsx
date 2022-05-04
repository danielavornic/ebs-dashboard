import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';

import useUserContext from 'hooks/useUserContext';
import Button from 'components/Button';

interface ContainerProps {
  page: string;
  onButtonClick?: () => void;
  children?: JSX.Element | false;
}

const Container: FC<ContainerProps> = ({ page, children, onButtonClick }) => {
  const { user } = useUserContext();

  return (
    <div className='container'>
      <div className='heading'>
        <h2>{page}</h2>
        {user && user.role === 'administrator' && page !== 'dashboard' && (
          <Button state='primary' type='button' onClick={onButtonClick}>
            <FiPlus />
            Add {page === 'users' ? 'user' : 'post'}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Container;
