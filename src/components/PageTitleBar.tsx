import { PropsWithChildren } from 'react';
import { Space } from 'ebs-design';

export const PageTitleBar = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <Space justify='space-between' className='mt-60 mb-24'>
      <h1 className='capitalized'>{title}</h1>
      {children}
    </Space>
  );
};
