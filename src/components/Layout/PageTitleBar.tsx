import { PropsWithChildren } from 'react';

interface Props {
  title: string;
}

const PageTitleBar = ({
  title,
  children: button,
}: PropsWithChildren<Props>) => {
  return (
    <div className='page-title-bar'>
      <h2 className='capitalized'>{title}</h2>
      {button}
    </div>
  );
};

export default PageTitleBar;
