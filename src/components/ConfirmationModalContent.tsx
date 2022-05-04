import Button from './Button';

interface Props {
  title: string;
  onConfirm: () => Promise<void>;
}

const ConfirmationModalContent = ({ title, onConfirm }: Props) => {
  return (
    <div className='confirm-modal-content'>
      <p>{title}</p>
      <Button state='danger' type='button' onClick={onConfirm}>
        Delete
      </Button>
    </div>
  );
};

export default ConfirmationModalContent;
