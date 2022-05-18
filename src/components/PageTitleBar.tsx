import { PropsWithChildren } from 'react';

export const PageTitleBar = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <div className='page-title-bar mt-60 mb-24'>
      <h2 className='capitalized'>{title}</h2>
      {children}
    </div>
  );
};
