import { PropsWithChildren } from 'react';
import { FiX } from 'react-icons/fi';

import useUserContext from 'hooks/useUserContext';

import Button from './Button';

interface Props {
  title: string;
}

const Modal = ({ children, title }: PropsWithChildren<Props>) => {
  const { isModalHidden, setIsModalHidden } = useUserContext();

  const handleCloseModal = () => setIsModalHidden(true);

  return (
    <div role='dialog' className='modal-container' hidden={isModalHidden}>
      <div className='modal'>
        <div className='modal__header'>
          <h3 className='capitalized'>{title}</h3>
          <Button state='transparent' type='button' onClick={handleCloseModal}>
            <FiX />
          </Button>
        </div>
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
