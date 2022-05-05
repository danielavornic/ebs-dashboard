import { ReactNode } from 'react';

import Menu from './Menu';
import TopBar from './TopBar';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='layout'>
      <Menu />
      <main>
        <TopBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
