import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import { PostActions, PostInterface } from 'types/post';
import { addPost, getPostById, updatePost } from 'api/posts';

import { PageTitleBar, Spinner } from 'components';
import PostForm from '../components/PostForm';
import PostArticle from '../components/PostArticle';
import { useEffect } from 'react';
import { UserRole } from 'types/user';
import useUserContext from 'hooks/useUserContext';

interface Props {
  action: PostActions;
  title?: string;
}

const Post = ({ action, title }: Props) => {
  const { user } = useUserContext();
  const navigate = useNavigate();
  const id = useParams().id;

  const {
    data: post,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(
    ['post', action],
    () => (action === PostActions.Create ? null : getPostById(Number(id))),
    {
      enabled: !!id,
    }
  );

  const onSuccess = () => navigate('/posts');

  const addPostMutation = useMutation(addPost, {
    onSuccess,
  });

  const updatePostMutation = useMutation(updatePost, {
    onSuccess,
  });

  const handleSubmitPost = (post: PostInterface) => {
    if (action === PostActions.Create) {
      addPostMutation.mutate(post);
    } else {
      updatePostMutation.mutate(post);
    }
  };

  useEffect(() => {
    if (user) {
      if (
        action === PostActions.Edit &&
        user.role !== UserRole.Admin &&
        post?.authorId !== user.id
      ) {
        onSuccess();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, post?.authorId]);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && (
        <>
          <PageTitleBar title='Error' />
          <p>Something went wrong. Please try again later.</p>
        </>
      )}
      {isSuccess && action === PostActions.View && <PostArticle post={post} />}
      {action !== PostActions.View && (
        <>
          <PageTitleBar title={title || ''} />
          <PostForm postAction={handleSubmitPost} post={post} />
        </>
      )}
    </>
  );
};

export default Post;
