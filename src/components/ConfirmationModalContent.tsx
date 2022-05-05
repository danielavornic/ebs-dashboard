import Button from './Button';

interface Props {
  title: string;
  onConfirm: () => Promise<void>;
}

const ConfirmationModalContent = ({ title, onConfirm }: Props) => {
  return (
    <>
      <p className='mb-20'>{title}</p>
      <Button state='danger' type='button' size='medium' onClick={onConfirm}>
        Delete
      </Button>
    </>
  );
};

export default ConfirmationModalContent;
