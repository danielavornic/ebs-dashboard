import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';
import useUserContext from '../../hooks/useUserContext';
import Button from '../Button';

interface ContainerProps {
  page: string;
  showButton?: boolean;
  children?: JSX.Element | false;
}

const Container: FC<ContainerProps> = ({
  showButton = true,
  page,
  children,
}) => {
  const { setIsModalHidden, setModalType, setSelectedUser } = useUserContext();

  const handleAddUser = () => {
    setIsModalHidden(false);
    setModalType('add');
    setSelectedUser(null);
  };

  return (
    <div className='container'>
      <div className='heading'>
        <h2>{page}</h2>
        {showButton && (
          <Button state='primary' type='button' onClick={handleAddUser}>
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
