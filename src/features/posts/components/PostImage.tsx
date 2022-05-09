import { Dispatch, SetStateAction, useEffect } from 'react';
import { FiImage } from 'react-icons/fi';

interface Props {
  imageUrl: string;
  isImageValid?: boolean;
  setIsImageValid?: Dispatch<SetStateAction<boolean>>;
}

const PostImage = ({
  imageUrl,
  isImageValid = true,
  setIsImageValid,
}: Props) => {
  useEffect(() => {
    if (setIsImageValid) {
      const checkImg = async () => {
        const res = await fetch(imageUrl).catch(() => {
          setIsImageValid(false);
          return;
        });

        if (res?.status === 200) {
          setIsImageValid((await res.blob()).type.startsWith('image/'));
        } else {
          setIsImageValid(false);
        }
      };

      if (imageUrl.includes('https://images.unsplash.com/photo')) {
        checkImg();
      } else {
        setIsImageValid(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

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
