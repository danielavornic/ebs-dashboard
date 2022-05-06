import Button from './Button';

interface Props {
  title: string;
  buttonText: string;
  onConfirm: () => Promise<void>;
}

const ConfirmationModalContent = ({ title, onConfirm, buttonText }: Props) => {
  return (
    <>
      <p className='mb-20'>{title}</p>
      <Button state='danger' type='button' size='medium' onClick={onConfirm}>
        {buttonText}
      </Button>
    </>
  );
};

export default ConfirmationModalContent;
