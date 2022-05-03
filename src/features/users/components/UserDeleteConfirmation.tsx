import { deleteUser } from '../../../api/users';
import useUserContext from '../../../hooks/useUserContext';

import Button from '../../../components/Button';

const UserDeleteConfirmation = () => {
  const { setIsModalHidden, selectedUser } = useUserContext();

  const handleDelete = async () => {
    if (selectedUser && selectedUser.id !== '') {
      await deleteUser(parseInt(selectedUser.id));
      setIsModalHidden(true);
    }
  };

  return (
    <div className='confirm-modal-content'>
      <p>Are you sure you want to delete this user?</p>
      <Button state='danger' type='button' onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
};

export default UserDeleteConfirmation;
