import { useLocation, useNavigate } from 'react-router-dom';
import { Icon, Sidebar } from 'ebs-design';

import useUserContext from 'hooks/useUserContext';

const topMenuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'chart',
  },
  {
    title: 'Users',
    path: '/users',
    icon: 'users',
  },
  {
    title: 'Posts',
    path: '/posts',
    icon: 'box',
  },
];

export const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { setUser, setIsLogged } = useUserContext();

  const logOutUser = () => {
    localStorage.removeItem('userId');
    setIsLogged(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <Sidebar>
      <Sidebar.TopMenu>
        {topMenuItems.map(({ title, path, icon }) => (
          <Sidebar.Item
            key={title}
            text={title}
            prefix={<Icon type={icon} />}
            onClick={() => navigate(path)}
            className={
              location.pathname.includes(path)
                ? 'ebs-sidebar__item--active'
                : ''
            }
          />
        ))}
      </Sidebar.TopMenu>
      <div className='ebs-sidebar__bottom'>
        <Sidebar.Item text='Log out' onClick={logOutUser} />
      </div>
    </Sidebar>
  );
};
