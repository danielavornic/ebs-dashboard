import { PropsWithChildren } from 'react';

export const PageTitleBar = ({
  title,
  children: button,
}: PropsWithChildren<{ title: string }>) => {
  return (
    <div className='page-title-bar mt-40 mb-36'>
      <h2 className='capitalized'>{title}</h2>
      {button}
    </div>
  );
};
