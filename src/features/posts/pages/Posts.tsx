import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import useUserContext from 'hooks/useUserContext';

import { Button, PageTitleBar } from 'components';

const Posts = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();

  return (
    <>
      <PageTitleBar title='Posts'>
        {user && user.role === 'administrator' && (
          <Button
            state='primary'
            type='button'
            size='medium'
            icon={<FiPlus />}
            onClick={() => navigate('/posts/create')}
          >
            Create post
          </Button>
        )}
      </PageTitleBar>
    </>
  );
};

export default Posts;
