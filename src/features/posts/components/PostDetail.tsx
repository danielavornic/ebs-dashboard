interface Props {
  icon: JSX.Element;
  value: string;
}

const PostDetail = ({ icon, value }: Props) => {
  return (
    <p className='mb-8'>
      <span className='mr-8'>{icon}</span>
      {value}
    </p>
  );
};

export default PostDetail;
