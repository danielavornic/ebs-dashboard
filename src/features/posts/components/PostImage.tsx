import { Dispatch, SetStateAction, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { FiImage } from 'react-icons/fi';

interface Props {
  imageUrl: string;
  isImageValid?: boolean;
  setIsImageValid?: Dispatch<SetStateAction<boolean>>;
}

const getImageBlob = async (imageUrl: string) => {
  const response = await axios.get(imageUrl, { responseType: 'blob' });
  return response.data;
};

const PostImage = ({
  imageUrl,
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
      if (!imageUrl.includes('https://images.unsplash.com/photo')) {
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
        <img className='post-image' src={imageUrl} alt='Post' />
      ) : (
        <div className='post-image-placeholder'>
          <div className='post-image-placeholder__icon'>
            <FiImage fontSize={100} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostImage;
