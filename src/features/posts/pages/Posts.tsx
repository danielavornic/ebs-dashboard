import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import { fetchPosts } from 'api/posts';
import useUserContext from 'hooks/useUserContext';
import { PostInterface } from 'types/post';

import { Button, PageTitleBar } from 'components';
import PostCard from '../components/PostCard';

const Posts = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const posts = await fetchPosts();
      setPosts(posts.reverse());
    };

    getPosts();
  }, []);

  return (
    <>
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
      <div>
        {posts.map((post: PostInterface) => (
          <PostCard key={post.id} post={post}>
            {(user?.id === post.authorId || user?.role === 'administrator') && (
              <div className='post-card__buttons mt-24'>
                <Link to={`/posts/${post.id}/edit`} className='mr-12'>
                  <Button state='primary' type='button' size='small'>
                    Edit
                  </Button>
                </Link>
                <Button state='danger' type='button' size='small'>
                  Delete
                </Button>
              </div>
            )}
          </PostCard>
        ))}
      </div>
    </>
  );
};

export default Posts;
