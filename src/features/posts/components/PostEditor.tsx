import { Dispatch, SetStateAction } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface Props {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const PostEditor = ({ content, setContent }: Props) => {
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
      onEditorChange={(newValue) => setContent(newValue)}
      init={{
        minHeight: 400,
        menubar: false,
      }}
    />
  );
};

export default PostEditor;
