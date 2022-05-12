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
  date: '',
  image: '',
  id: 0,
};

const PostForm = ({ post: data, postAction }: Props) => {
  const { user } = useUserContext();

  const [post, setPost] = useState(blankPost);
  const [isImageValid, setIsImageValid] = useState(false);
  const { title, content, date, image } = post;

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

    const { author, authorId } = data || {
      author: `${user?.name} ${user?.lastName}`,
      authorId: user?.id || -1,
    };

    await postAction({
      ...post,
      author,
      authorId,
    });
  };

  useEffect(() => {
    if (data) setPost({ ...data });
  }, [data]);

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
            apiKey='iuj2370hpse6jvn0xbymysrr8hp5hugw568xv649g8745fyo'
            plugins={[
              'autoresize',
              'lists',
              'link',
              'wordcount',
              'fontsize',
              'searchreplace',
              'fullscreen',
            ]}
            toolbar={
              'undo redo | fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link | searchreplace | fullscreen'
            }
            id='content'
            textareaName='content'
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
      </form>
    </>
  );
};

export default PostForm;
