import { FC } from 'react';
import { FiX } from 'react-icons/fi';

import useUserContext from '../hooks/useUserContext';

interface ModalProps {
  children?: JSX.Element;
  title: string;
}

const Modal: FC<ModalProps> = ({ children, title }) => {
  const { isModalHidden, setIsModalHidden } = useUserContext();

  const handleCloseModal = () => setIsModalHidden(true);

  return (
    <div role='dialog' className='modal' hidden={isModalHidden}>
      <div className='modal-content'>
        <div className='modal-header'>
          <h3>{title}</h3>
          <button type='button' className='close' onClick={handleCloseModal}>
            <FiX />
          </button>
        </div>
        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
