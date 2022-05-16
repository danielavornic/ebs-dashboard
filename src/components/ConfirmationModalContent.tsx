import { Button } from 'components';

interface Props {
  title: string;
  buttonText: string;
  onConfirm: () => void;
}

export const ConfirmationModalContent = ({
  title,
  onConfirm,
  buttonText,
}: Props) => {
  return (
    <>
      <p className='mb-20'>{title}</p>
      <Button state='danger' type='button' size='medium' onClick={onConfirm}>
        {buttonText}
      </Button>
    </>
  );
};
