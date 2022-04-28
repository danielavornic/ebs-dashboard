import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUserContext from '../../hooks/useUserContext';

interface TopbarProps {
  name: string;
  lastName: string;
  pageTitle: string;
}

const Topbar: FC<TopbarProps> = ({ name, lastName, pageTitle }) => {
  const navigate = useNavigate();

  const { setIsLogged, setUser } = useUserContext();
  const [isLogoutHidden, setIsLogoutHidden] = useState<boolean>(true);

  const toggleLogoutButton = () => setIsLogoutHidden(!isLogoutHidden);

  const logOutUser = () => {
    localStorage.removeItem('userId');
    setIsLogged(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='top-bar'>
      <h1>{pageTitle}</h1>

      <div className='logged-user-bubble'>
        <div className='user-info' onClick={toggleLogoutButton}>
          <div className='avatar alt-font'>
            <b>{name.charAt(0)}</b>
          </div>
          <div className='name alt-font'>
            {name} {lastName}
          </div>
        </div>
        <div className='logout' hidden={isLogoutHidden}>
          <button onClick={logOutUser}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
