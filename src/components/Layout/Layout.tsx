import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';

import useUserContext from '../../hooks/useUserContext';
import { User, UserProperties } from '../../types/user.types';

import Table from '../Table';
import Menu from './Menu';
import Topbar from './Topbar';
import Button from '../Button';

interface LayoutProps {
  page: string;
  data: User[];
  showTable?: boolean;
  showButton?: boolean;
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
  showButton = true,
  showTable = true,
  headings = [],
  properties = [],
}) => {
  const {
    user,
    setIsModalHidden,
    setModalType,
    setSelectedUser,
    selectedUser,
  } = useUserContext();

  let name = '';
  let lastName = '';

  if (user) {
    name = user.name;
    lastName = user.lastName;
  }

  const handleAddUser = () => {
    setIsModalHidden(false);
    setModalType('add');
    setSelectedUser(null);
    console.log(selectedUser);
  };

  return (
    <div className='panel'>
      <Menu page={page} />
      <main>
        <Topbar name={name} lastName={lastName} />
        <Container>
          <>
            <div className='heading'>
              <h2>{page}</h2>
              {showButton && (
                <Button state='primary' type='button' onClick={handleAddUser}>
                  <FiPlus />
                  Add {page === 'users' ? 'user' : 'post'}
                </Button>
              )}
            </div>
            {showTable && (
              <Table data={data} headings={headings} properties={properties} />
            )}
          </>
        </Container>
      </main>
    </div>
  );
};

export default Layout;
