import { useLocation, useNavigate } from 'react-router-dom';

import { PageTitleBar } from 'components';
import PostForm from '../components/PostForm';
import { PostInterface } from 'types/post';
import { addPost } from 'api/posts';
import useUserContext from 'hooks/useUserContext';
import { useEffect } from 'react';

const Post = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const action = useLocation().pathname.split('/').pop();
  const title = action === 'create' ? 'Create post' : 'Edit post';

  useEffect(() => {
    if (user && user.role !== 'administrator' && action === 'create')
      navigate('/');
  }, [action, navigate, user]);

  const handleSubmitPost = async (post: PostInterface) => {
    if (action === 'create') {
      await addPost(post);
      navigate('/posts');
    }
  };

  return (
    <>
      <PageTitleBar title={title} />
      <PostForm postAction={handleSubmitPost} />
    </>
  );
};

export default Post;
