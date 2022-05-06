import { PropsWithChildren } from 'react';
import { FiX } from 'react-icons/fi';

import Button from './Button';

interface Props {
  title: string;
  hidden: boolean;
  toggleModal: () => void;
}

const Modal = ({
  children,
  title,
  hidden,
  toggleModal,
}: PropsWithChildren<Props>) => {
  return (
    <div role='dialog' className='modal-container' hidden={hidden}>
      <div className='modal'>
        <div className='modal__header'>
          <h3 className='capitalized'>{title}</h3>
          <Button state='transparent' type='button' onClick={toggleModal}>
            <FiX />
          </Button>
        </div>
        <div className='modal__body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
