import { FC } from 'react';

import useUserContext from '../../hooks/useUserContext';

import '../../styles/Layout.scss';
import Menu from './Menu';
import Topbar from './Topbar';

interface LayoutProps {
  page: string;
}

const Container = () => {
  return <div className='container'></div>;
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
      <Menu page={page} />
      <main>
        <Topbar name={name} lastName={lastName} pageTitle={page} />
        <Container />
      </main>
    </div>
  );
};

export default Layout;
