import { ReactNode } from 'react';

import { Menu, TopBar } from 'components';

export const Layout = ({ children }: { children: ReactNode }) => {
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
