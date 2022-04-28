import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  page: string;
}

const Menu: FC<Props> = ({ page }) => {
  const links = [
    {
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      name: 'Users',
      path: '/users',
    },
    {
      name: 'Posts',
      path: '/posts',
    },
  ];
  return (
    <div className='menu'>
      <div className='title'>
        <h2>Admin panel</h2>
      </div>
      <ul>
        {links.map(({ name, path }) => (
          <li
            key={name}
            className={page === name.toLocaleLowerCase() ? 'active' : ''}
          >
            <Link to={path}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
