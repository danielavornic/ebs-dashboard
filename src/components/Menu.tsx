import { Link, useLocation } from 'react-router-dom';
import { FiBarChart2, FiFileText, FiUsers } from 'react-icons/fi';

export const Menu = () => {
  const page = useLocation().pathname;

  const menuItems = [
    {
      icon: <FiBarChart2 className='sidemenu__item__icon' />,
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <FiUsers className='sidemenu__item__icon' />,
      name: 'Users',
      path: '/users',
    },
    {
      icon: <FiFileText className='sidemenu__item__icon' />,
      name: 'Posts',
      path: '/posts',
    },
  ];

  return (
    <div className='sidemenu'>
      <ul className='sidemenu__list'>
        {menuItems.map(({ icon, name, path }) => {
          const statusClass = path === page ? 'sidemenu__item--active' : '';
          return (
            <li key={name} className={`sidemenu__item ${statusClass}`}>
              <Link to={path} className='sidemenu__item__link'>
                {icon} {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
