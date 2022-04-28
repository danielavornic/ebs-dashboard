import { FC } from 'react';

import useUserContext from '../../hooks/useUserContext';

import '../../styles/Layout.scss';
import Topbar from './Topbar';

interface LayoutProps {
  page: string;
}

const Container = () => {
  return <div className='container'></div>;
};

const Menu = () => {
  return <div className='menu'></div>;
};

const Layout: FC<LayoutProps> = ({ page }) => {
  const { user } = useUserContext();

  let name = '';
  let lastName = '';

  if (user) {
    name = user.name;
    lastName = user.lastName;
  }

  return (
    <div className='panel'>
      <Menu />
      <main>
        <Topbar name={name} lastName={lastName} pageTitle={page} />
        <Container />
      </main>
    </div>
  );
};

export default Layout;
