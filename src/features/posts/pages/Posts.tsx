import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FiPlus } from 'react-icons/fi';

import { PostInterface } from 'types/post';
import { UserRole } from 'types/user';
import { deletePost, fetchPosts } from 'api/posts';
import useUserContext from 'hooks/useUserContext';

import {
  Button,
  ConfirmationModalContent,
  Grid,
  Modal,
  PageTitleBar,
  Spinner,
} from 'components';
import PostCard from '../components/PostCard';

const sortPosts = (posts: PostInterface[]) =>
  posts.sort(
    (a: PostInterface, b: PostInterface) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

const initialModal = {
  isHidden: true,
  postId: -1,
};

const Posts = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUserContext();

  const [modal, setModal] = useState(initialModal);

  const { data: posts, isLoading, isSuccess } = useQuery('posts', fetchPosts);

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      setModal(initialModal);
    },
  });

  return (
    <>
      <Modal
        title='Delete post'
        hidden={modal.isHidden}
        toggleModal={() => setModal({ ...modal, isHidden: !modal.isHidden })}
      >
        <ConfirmationModalContent
          title='Are you sure you want to delete this post?'
          buttonText='Delete'
          onConfirm={() => deletePostMutation.mutate(modal.postId)}
        />
      </Modal>
      <PageTitleBar title='Posts'>
        <Button
          state='primary'
          type='button'
          size='medium'
          icon={<FiPlus />}
          onClick={() => navigate('/posts/create')}
        >
          Create post
        </Button>
      </PageTitleBar>
      {isLoading && <Spinner />}
      {isSuccess && (
        <>
          {sortPosts(posts).length > 0 ? (
            <Grid spacing={1} cols={4}>
              {posts.map((post: PostInterface) => (
                <PostCard key={post.id} post={post}>
                  {(user?.id === post.authorId ||
                    user?.role === UserRole.Admin) && (
                    <div className='post-card__buttons mt-24'>
                      <Link to={`/posts/${post.id}/edit`} className='mr-12'>
                        <Button state='primary' type='button' size='small'>
                          Edit
                        </Button>
                      </Link>
                      <Button
                        state='danger'
                        type='button'
                        size='small'
                        onClick={() =>
                          setModal({ isHidden: false, postId: post.id })
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </PostCard>
              ))}
            </Grid>
          ) : (
            <>
              <h2 className='mb-24'>No posts yet</h2>
              <p>You can create a post by clicking the button above.</p>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Posts;
