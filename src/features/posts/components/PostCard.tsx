import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { PostInterface } from 'types/post';

import PostDetail from './PostDetail';

const formatContent = (content: string) => {
  const stripped = content.replace(/<[^>]+>/g, '');
  return stripped.length > 200 ? stripped.substring(0, 199) + '…' : stripped;
};

const PostCard = ({
  post,
  children: buttons,
}: PropsWithChildren<{ post: PostInterface }>) => {
  const { id, title, content, date, image, author } = post;

  return (
    <div className='post-card'>
      <div
        className='post-card__image mb-24'
        style={{ backgroundImage: `url(${image})` }}
      />
      <h3 className='post-card__title mb-24'>{title}</h3>
      <PostDetail icon={<FiCalendar />} value={date} />
      <PostDetail icon={<FiUser />} value={author} />
      <div
        className='mt-24 '
        dangerouslySetInnerHTML={{
          __html: formatContent(content),
        }}
      />
      <p className='post-card__more mt-12'>
        <Link to={`/posts/${id}`}>Read more</Link>
      </p>
      {buttons}
    </div>
  );
};

export default PostCard;
