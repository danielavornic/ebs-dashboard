import { Link } from 'react-router-dom';
import { FiBarChart2, FiFileText, FiUsers } from 'react-icons/fi';

const Menu = ({ page }: { page: string }) => {
  const menuItems = [
    {
      icon: <FiBarChart2 />,
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <FiUsers />,
      name: 'Users',
      path: '/users',
    },
    {
      icon: <FiFileText />,
      name: 'Posts',
      path: '/posts',
    },
  ];

  return (
    <div className='menu'>
      <ul>
        {menuItems.map(({ icon, name, path }) => (
          <li
            key={name}
            className={page === name.toLocaleLowerCase() ? 'active' : ''}
          >
            <Link to={path}>
              {icon} {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
