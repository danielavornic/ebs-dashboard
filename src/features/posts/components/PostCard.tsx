import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon } from 'ebs-design';

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
    <Card className='mb-40'>
      <div
        className='h-250 bg-cover'
        style={{ backgroundImage: `url(${image})` }}
      />
      <Card.Header>
        <h2 className='mb-24'>{title}</h2>
        <PostDetail icon={<Icon type='calendar' />} value={date} />
        <PostDetail icon={<Icon type='users' />} value={author} />
      </Card.Header>
      <Card.Body>
        <div
          className='mt-24'
          dangerouslySetInnerHTML={{
            __html: formatContent(content),
          }}
        />
        <p className='mt-12'>
          <Link to={`/posts/${id}`}>Read more</Link>
        </p>
      </Card.Body>
      {buttons}
    </Card>
  );
};

export default PostCard;
