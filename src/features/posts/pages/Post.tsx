import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { PostInterface } from 'types/post';
import { UserRole } from 'types/user';
import { addPost, getPostById, updatePost } from 'api/posts';
import useUserContext from 'hooks/useUserContext';

import { PageTitleBar } from 'components';
import PostForm from '../components/PostForm';
import PostArticle from '../components/PostArticle';

interface Props {
  action: 'create' | 'edit' | 'view';
  title?: string;
}

const Post = ({ action, title }: Props) => {
  const { user } = useUserContext();

  const navigate = useNavigate();
  const id = useParams().id;

  const [post, setPost] = useState<PostInterface>();

  const getPost = async (id: number) => {
    const post = await getPostById(id);
    if (post) setPost(post);

    if (
      !post ||
      (action === 'edit' &&
        user?.role !== UserRole.Admin &&
        user?.id !== post.authorId)
    )
      navigate('/posts');
  };

  useEffect(() => {
    if (action !== 'create') {
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
      {post && action === 'view' && <PostArticle post={post} />}
      {action !== 'view' && (
        <>
          <PageTitleBar title={title || ''} />
          <PostForm postAction={handleSubmitPost} post={post} />
        </>
      )}
    </>
  );
};

export default Post;
