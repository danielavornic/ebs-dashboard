import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { PostInterface } from 'types/post';

interface Props {
  post: PostInterface;
}

const PostCard = ({ post, children: buttons }: PropsWithChildren<Props>) => {
  const { id, title, content, date, image, author } = post;

  return (
    <div className='post-card'>
      <div
        className='post-card__image mb-24'
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <h3 className='post-card__title mb-24'>{title}</h3>
      <p className='post-card__author mb-8'>
        <span className='post-card__icon'>
          <FiUser />
        </span>
        {author}
      </p>
      <p className='post-card__date mb-24'>
        <span className='post-card__icon'>
          <FiCalendar />
        </span>
        {date}
      </p>
      <p className='post-card__content'>
        {content.length > 200 ? content.substring(0, 199) + '…' : content}
      </p>
      <p className='post-card__more mt-12'>
        <Link to={`/posts/${id}`}>Read more</Link>
      </p>
      {buttons}
    </div>
  );
};

export default PostCard;
