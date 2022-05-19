import { useEffect } from 'react';
import { Button, Loader } from 'ebs-design';

import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import useUserContext from 'hooks/useUserContext';

import { PostActions, PostInterface } from 'types/post';
import { UserRole } from 'types/user';
import { addPost, getPostById, updatePost } from 'api/posts';

import { PageTitleBar } from 'components';
import PostForm from '../components/PostForm';
import PostArticle from '../components/PostArticle';

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
      {isLoading && <Loader loading />}
      {isError && (
        <>
          <PageTitleBar title='Error' />
          <p>Something went wrong. Please try again later.</p>
        </>
      )}
      {isSuccess && action === PostActions.View && (
        <>
          <PageTitleBar title={post.title} />
          <PostArticle post={post} />
        </>
      )}
      {action !== PostActions.View && (
        <>
          <PageTitleBar title={title || ''}>
            <Button type='primary' form='postForm' submit>
              Save post
            </Button>
          </PageTitleBar>
          <PostForm postAction={handleSubmitPost} post={post} />
        </>
      )}
    </>
  );
};

export default Post;
