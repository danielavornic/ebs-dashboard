import { Dispatch, SetStateAction, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

interface Props {
  imageUrl: string;
  height: number;
  isImageValid?: boolean;
  setIsImageValid?: Dispatch<SetStateAction<boolean>>;
}

const getImageBlob = async (imageUrl: string) => {
  const response = await axios.get(imageUrl, { responseType: 'blob' });
  return response.data;
};

const PostImage = ({
  imageUrl,
  height,
  isImageValid = true,
  setIsImageValid,
}: Props) => {
  const { data: imageBlob, isSuccess } = useQuery(
    ['imageBlob', imageUrl],
    () => getImageBlob(imageUrl),
    {
      enabled: !!imageUrl && !!setIsImageValid,
    }
  );

  useEffect(() => {
    if (setIsImageValid) {
      if (!imageUrl.includes('https://images.unsplash.com')) {
        setIsImageValid(false);
        return;
      }

      setIsImageValid(isSuccess ? imageBlob.type.startsWith('image/') : false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageBlob]);

  return (
    <div className='mb-24'>
      {isImageValid ? (
        <img className={`h-${height}`} src={imageUrl} alt='Post' />
      ) : (
        <div className='h-400 bg-primary-pattern' />
      )}
    </div>
  );
};

export default PostImage;
