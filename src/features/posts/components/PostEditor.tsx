import { Dispatch, SetStateAction } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { PostInterface } from 'types/post';

interface Props {
  content: string;
  setPost: Dispatch<SetStateAction<PostInterface>>;
}

const PostEditor = ({ content, setPost }: Props) => {
  return (
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
  );
};

export default PostEditor;
