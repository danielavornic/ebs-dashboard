import { FC } from 'react';

import useUserContext from '../../hooks/useUserContext';
import { User, UserProperties } from '../../types/user.types';

import Table from '../Table';
import Menu from './Menu';
import Topbar from './Topbar';

import '../../styles/Layout.scss';

interface LayoutProps {
  page: string;
  data: User[];
  showTable?: boolean;
  headings?: string[];
  properties?: UserProperties[];
}

interface ContainerProps {
  children?: JSX.Element | false;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className='container'>{children}</div>;
};

const Layout: FC<LayoutProps> = ({
  page,
  data,
  showTable = true,
  headings = [],
  properties = [],
}) => {
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
        <Container>
          {showTable && (
            <Table data={data} headings={headings} properties={properties} />
          )}
        </Container>
      </main>
    </div>
  );
};

export default Layout;
