import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { PostInterface } from 'types/post';
import { addPost, getPostById, updatePost } from 'api/posts';
import useUserContext from 'hooks/useUserContext';

import { PageTitleBar } from 'components';
import PostForm from '../components/PostForm';

const Post = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();
  const id = useParams().id;
  const action = useLocation().pathname.split('/').pop();

  const title = action === 'create' ? 'Create post' : 'Edit post';

  const [post, setPost] = useState<PostInterface>();

  const getPost = async (id: number) => {
    const post = await getPostById(id);
    if (post) {
      setPost(post);
    }

    if (
      !post ||
      (action === 'edit' &&
        user?.role !== 'administrator' &&
        user?.id !== post.authorId)
    )
      navigate('/posts');
  };

  useEffect(() => {
    if (action === 'edit') {
      getPost(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, action]);

  const handleSubmitPost = async (post: PostInterface) => {
    if (action === 'create') {
      await addPost(post);
    }

    if (action === 'edit') {
      await updatePost(post.id, post);
    }

    navigate('/posts');
  };

  return (
    <>
      <PageTitleBar title={title} />
      <PostForm postAction={handleSubmitPost} post={post ? post : undefined} />
    </>
  );
};

export default Post;