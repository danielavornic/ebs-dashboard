import { Space } from 'ebs-design';

interface Props {
  icon: JSX.Element;
  value: string;
}

const PostDetail = ({ icon, value }: Props) => {
  return (
    <Space justify='start' align='center' className='mb-8'>
      <span>{icon}</span>
      <span>{value}</span>
    </Space>
  );
};

export default PostDetail;
