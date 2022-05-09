import { FiCalendar, FiUser } from 'react-icons/fi';

import { PostInterface } from 'types/post';

import PostImage from './PostImage';
import PostDetail from './PostDetail';

const PostArticle = ({ post }: { post: PostInterface }) => {
  const { title, author, content, date, image } = post;

  return (
    <article className='mt-40 mb-400'>
      <h2 className='mb-36'>{title}</h2>
      <PostImage imageUrl={image} />
      <PostDetail icon={<FiCalendar />} value={date} />
      <PostDetail icon={<FiUser />} value={author} />
      <p className='mt-36 pre-line text-lg'>{content}</p>
    </article>
  );
};

export default PostArticle;
