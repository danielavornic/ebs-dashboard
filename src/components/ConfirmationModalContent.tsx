import { Button, Modal, Space } from 'ebs-design';

interface Props {
  title: string;
  buttonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModalContent = ({
  title,
  buttonText,
  onConfirm,
  onCancel,
}: Props) => {
  return (
    <>
      <Modal.Content>
        <p>{title}</p>
      </Modal.Content>
      <Modal.Footer>
        <Space justify='space-between'>
          <Button type='ghost' onClick={onCancel}>
            Cancel
          </Button>
          <Button type='primary' onClick={onConfirm}>
            {buttonText}
          </Button>
        </Space>
      </Modal.Footer>
    </>
  );
};
