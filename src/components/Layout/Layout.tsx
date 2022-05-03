import { FC } from 'react';

import useUserContext from '../../hooks/useUserContext';

import Menu from './Menu';
import Topbar from './Topbar';
import Container from './Container';

interface LayoutProps {
  page: string;
  children?: JSX.Element;
}

const Layout: FC<LayoutProps> = ({ page, children }) => {
  const { user } = useUserContext();
  const name = user ? user.name : '';
  const lastName = user ? user.lastName : '';

  return (
    <div className='panel'>
      <Menu page={page} />
      <main>
        <Topbar name={name} lastName={lastName} />
        <Container page={page}>{children}</Container>
      </main>
    </div>
  );
};

export default Layout;
