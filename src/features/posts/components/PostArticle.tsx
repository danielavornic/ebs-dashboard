import { Icon } from 'ebs-design';

import { PostInterface } from 'types/post';

import PostImage from './PostImage';
import PostDetail from './PostDetail';

const PostArticle = ({ post }: { post: PostInterface }) => {
  const { author, content, date, image } = post;

  return (
    <article className='mb-400'>
      <PostImage imageUrl={image} height={400} />
      <PostDetail icon={<Icon type='calendar' />} value={date} />
      <PostDetail icon={<Icon type='users' />} value={author} />
      <div
        className='mt-36'
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
};

export default PostArticle;
