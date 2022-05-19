/* eslint-disable react-hooks/exhaustive-deps */
import { FormEvent, useEffect, useState } from 'react';
import { Form, Input, useForm } from 'ebs-design';

import { PostInterface } from 'types/post';
import useUserContext from 'hooks/useUserContext';

import PostImage from './PostImage';
import PostEditor from './PostEditor';

interface Props {
  post?: PostInterface;
  postAction: (post: PostInterface) => void;
}

const PostForm = ({ post, postAction }: Props) => {
  const [form] = useForm();

  const { user } = useUserContext();

  const [content, setContent] = useState(post?.content || '');
  const [imageUrl, setImageUrl] = useState(post?.image || '');
  const [isImageValid, setIsImageValid] = useState(false);

  const handleImageChange = (e: KeyboardEvent | FormEvent) => {
    const { value } = e.target as HTMLInputElement;
    setImageUrl(value);
  };

  useEffect(() => {
    if (post) {
      form.setFields([
        {
          name: 'title',
          value: post.title,
        },
        {
          name: 'image',
          value: post.image,
        },
        {
          name: 'date',
          value: post.date,
        },
        {
          name: 'author',
          value: post.author,
        },
        {
          name: 'authorId',
          value: post.authorId,
        },
      ]);

      setContent(post.content);
      setImageUrl(post.image);
    }
  }, [post]);

  useEffect(() => {
    if (user)
      form.setFields([
        {
          name: 'author',
          value: `${user.name} ${user.lastName}`,
        },
        {
          name: 'authorId',
          value: user.id,
        },
      ]);
  }, [user]);

  const handleSubmit = (values: PostInterface) => {
    if (!isImageValid) {
      form.setFields([
        {
          name: 'image',
          errors: ['Please input a valid image URL from Unsplash'],
        },
      ]);
      return;
    }

    let newPost: PostInterface = {
      ...values,
      content,
    };
    if (post) newPost.id = post.id;

    postAction(newPost);
  };

  return (
    <>
      <PostImage
        imageUrl={imageUrl}
        height={400}
        isImageValid={isImageValid}
        setIsImageValid={setIsImageValid}
      />
      <Form
        form={form}
        id='postForm'
        className='mb-400'
        onFinish={handleSubmit}
        initialValues={{
          title: post?.title || '',
          image: post?.image || '',
          date: post?.date || '',
          author: post?.author || '',
          authorId: post?.authorId || -1,
        }}
      >
        <Form.Field
          label='Title'
          name='title'
          hideLabel
          rules={[{ required: true }]}
        >
          <Input
            type='text'
            placeholder='Title'
            size='large'
            autoComplete='on'
          />
        </Form.Field>
        <Form.Field
          label='Image from Unsplash'
          name='image'
          hideLabel
          rules={[{ required: true }]}
        >
          <Input
            type='text'
            placeholder='Image from Unsplash'
            size='large'
            autoComplete='on'
            onKeyDown={handleImageChange}
            onInput={handleImageChange}
          />
        </Form.Field>
        <Form.Field
          label='Date'
          name='date'
          hideLabel
          rules={[{ required: true }]}
        >
          <Input
            type='date'
            placeholder='Date'
            size='large'
            autoComplete='on'
          />
        </Form.Field>
        <Form.Field label='Content' name='content' hideLabel>
          <PostEditor content={content} setContent={setContent} />
        </Form.Field>
        <Form.Field label='Author' name='author' hideLabel className='d-none'>
          <Input type='text' value={post?.author} />
        </Form.Field>
        <Form.Field
          label='Author ID'
          name='authorId'
          hideLabel
          className='d-none'
        >
          <Input type='text' value={post?.authorId} />
        </Form.Field>
      </Form>
    </>
  );
};

export default PostForm;
