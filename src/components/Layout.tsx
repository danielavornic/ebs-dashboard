import { ReactNode } from 'react';

import { Menu, TopBar } from 'components';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='layout'>
      <Menu />
      <main className='custom-scrollbar'>
        <TopBar />
        {children}
      </main>
    </div>
  );
};
