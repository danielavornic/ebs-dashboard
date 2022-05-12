import { FormEvent, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { PostInterface } from 'types/post';
import useUserContext from 'hooks/useUserContext';

import { Button, Input } from 'components';
import PostImage from './PostImage';

interface Props {
  post?: PostInterface;
  postAction: (post: PostInterface) => Promise<void>;
}

const blankPost = {
  title: '',
  content: '',
  author: '',
  authorId: -1,
  date: '',
  image: '',
  id: 0,
};

const PostForm = ({ post: data, postAction }: Props) => {
  const { user } = useUserContext();

  const [post, setPost] = useState(blankPost);
  const [isImageValid, setIsImageValid] = useState(false);
  const { title, content, date, image, author } = post;

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isImageValid) {
      alert('Please input a valid image URL from Unsplash');
      return;
    }

    if (content === '') {
      alert('Please write the post description');
      return;
    }

    await postAction(post);
  };

  useEffect(() => {
    if (data) setPost({ ...data });
  }, [data]);

  useEffect(() => {
    if (author === '')
      setPost((prevPost) => ({
        ...prevPost,
        author: `${user?.name} ${user?.lastName}`,
        authorId: user?.id || -1,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <PostImage
        imageUrl={image}
        isImageValid={isImageValid}
        setIsImageValid={setIsImageValid}
      />
      <form className='form mb-400' onSubmit={handleSubmit}>
        <div className='form__group form__group--flex'>
          <label htmlFor='title' hidden>
            Title
          </label>
          <Input
            type='text'
            placeholder='Title'
            name='title'
            id='title'
            width='full'
            className='mr-12'
            value={title}
            onChange={handleChange}
          />
          <Button type='submit' state='primary' size='medium'>
            Save
          </Button>
        </div>
        <div className='form__group form__group--flex'>
          <label htmlFor='image' hidden>
            Image from Unsplash
          </label>
          <Input
            type='text'
            placeholder='Image from Unsplash'
            name='image'
            id='image'
            width='full'
            className='mr-12'
            value={image}
            onChange={handleChange}
          />
          <label htmlFor='date' hidden>
            Date
          </label>
          <Input
            type='date'
            placeholder='Date'
            name='date'
            id='date'
            width='auto'
            value={date}
            onChange={handleChange}
          />
        </div>
        <div className='form__group'>
          <label htmlFor='content' hidden>
            Content
          </label>
          <Editor
            id='content'
            textareaName='content'
            apiKey='iuj2370hpse6jvn0xbymysrr8hp5hugw568xv649g8745fyo'
            plugins={[
              'autoresize',
              'lists',
              'link',
              'wordcount',
              'searchreplace',
              'fullscreen',
            ]}
            toolbar={
              'undo redo | fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | searchreplace | fullscreen'
            }
            value={content}
            onEditorChange={(newValue) =>
              setPost((prevPost) => ({
                ...prevPost,
                content: newValue,
              }))
            }
            init={{
              minHeight: 400,
              menubar: false,
              content_style: 'body { color: #a3aed0; }',
            }}
          />
        </div>
        <div className='form__group' hidden>
          <label htmlFor='author'>Author</label>
          <Input
            type='text'
            name='author'
            id='author'
            value={author}
            onChange={handleChange}
            required={false}
          />
        </div>
      </form>
    </>
  );
};

export default PostForm;
