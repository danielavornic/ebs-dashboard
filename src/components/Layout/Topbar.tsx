import { FC, useState } from 'react';

interface TopbarProps {
  name: string;
  lastName: string;
  pageTitle: string;
}

const Topbar: FC<TopbarProps> = ({ name, lastName, pageTitle }) => {
  const [isLogoutHidden, setIsLogoutHidden] = useState<boolean>(true);

  const handleClick = () => setIsLogoutHidden(!isLogoutHidden);

  return (
    <div className='top-bar'>
      <h1>{pageTitle}</h1>

      <div className='logged-user-bubble'>
        <div className='user-info' onClick={handleClick}>
          <div className='avatar alt-font'>
            <b>{name.charAt(0)}</b>
          </div>
          <div className='name alt-font'>
            {name} {lastName}
          </div>
        </div>
        <div className='logout' hidden={isLogoutHidden}>
          <button>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
