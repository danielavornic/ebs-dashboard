import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Button, Card, Col, Icon, Loader, Modal, Row, Space } from 'ebs-design';

import { PostInterface } from 'types/post';
import { UserRole } from 'types/user';
import { deletePost, fetchPosts } from 'api/posts';
import useUserContext from 'hooks/useUserContext';

import { ConfirmationModalContent, PageTitleBar } from 'components';
import PostCard from '../components/PostCard';

const sortPosts = (posts: PostInterface[]) =>
  posts.sort(
    (a: PostInterface, b: PostInterface) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );

const initialModal = {
  isOpen: false,
  postId: -1,
};

const Posts = () => {
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
        closeOnClickOutside
        onClose={() => setModal(initialModal)}
        title={'Delte post'}
        open={modal.isOpen}
        size='small'
      >
        <ConfirmationModalContent
          title='Are you sure you want to delete this post?'
          buttonText='Delete'
          onConfirm={() => deletePostMutation.mutate(modal.postId)}
          onCancel={() => setModal(initialModal)}
        />
      </Modal>
      <PageTitleBar title='Posts'>
        <Link to='/posts/create'>
          <Button type='primary' size='medium' prefix={<Icon type='create' />}>
            Create post
          </Button>
        </Link>
      </PageTitleBar>
      {isLoading && <Loader loading />}
      {isSuccess && (
        <>
          {sortPosts(posts).length > 0 ? (
            <Row>
              {posts.map((post: PostInterface) => (
                <Col size={3} key={post.id}>
                  <PostCard post={post}>
                    {((user?.id === post.authorId &&
                      `${user?.name} ${user?.lastName}` === post.author) ||
                      user?.role === UserRole.Admin) && (
                      <Card.Footer>
                        <Space justify='end'>
                          <Link to={`/posts/${post.id}/edit`}>
                            <Button type='primary' size='small'>
                              Edit
                            </Button>
                          </Link>
                          <Button
                            type='fill'
                            size='small'
                            onClick={() =>
                              setModal({ isOpen: true, postId: post.id })
                            }
                          >
                            Delete
                          </Button>
                        </Space>
                      </Card.Footer>
                    )}
                  </PostCard>
                </Col>
              ))}
            </Row>
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
