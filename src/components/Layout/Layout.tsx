import { PropsWithChildren } from 'react';

import useUserContext from 'hooks/useUserContext';

import Menu from './Menu';
import Topbar from './Topbar';
import Container from './Container';

interface Props {
  page: string;
  onButtonClick?: () => void;
}

const Layout = ({
  page,
  children,
  onButtonClick,
}: PropsWithChildren<Props>) => {
  const { user } = useUserContext();
  const name = user ? user.name : '';
  const lastName = user ? user.lastName : '';

  return (
    <div className='panel'>
      <Menu page={page} />
      <main>
        <Topbar name={name} lastName={lastName} />
        <Container page={page} onButtonClick={onButtonClick}>
          {children}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
