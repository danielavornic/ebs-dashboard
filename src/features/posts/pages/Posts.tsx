import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const Posts = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState({
    isHidden: true,
    postId: -1,
  });

  const toggleModal = () => setModal({ ...modal, isHidden: !modal.isHidden });

  const getPosts = async () => {
    const posts = await fetchPosts();
    const sortedPosts = posts.sort(
      (a: PostInterface, b: PostInterface) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setPosts(sortedPosts);
    setIsLoading(false);
  };

  const handlePostDelete = async () => {
    await deletePost(modal.postId);
    await getPosts();
    setModal({
      isHidden: true,
      postId: -1,
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Modal
        title='Delete post'
        hidden={modal.isHidden}
        toggleModal={toggleModal}
      >
        <ConfirmationModalContent
          title='Are you sure you want to delete this post?'
          buttonText='Delete'
          onConfirm={handlePostDelete}
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
      {!isLoading && (
        <>
          {posts.length > 0 ? (
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
