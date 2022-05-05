import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useUserContext from 'hooks/useUserContext';

import Button from 'components/Button';

const TopBar = () => {
  const navigate = useNavigate();

  const { setIsLogged, setUser, user } = useUserContext();
  const [isUserMenuHidden, setisUserMenuHidden] = useState<boolean>(true);

  const { name, lastName } = user || { name: '', lastName: '' };
  const fullName = `${name} ${lastName}`;

  const toggleLogoutButton = () => setisUserMenuHidden(!isUserMenuHidden);

  const logOutUser = () => {
    localStorage.removeItem('userId');
    setIsLogged(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='top-bar'>
      <h1 className='capitalized mt-12'>Admin Panel</h1>

      <div className='user'>
        <div className='user__info' onClick={toggleLogoutButton}>
          <div className='user__info__avatar alt-font'>{name.charAt(0)}</div>
          <p className='alt-font'>{fullName}</p>
        </div>
        <div className='user__menu' hidden={isUserMenuHidden}>
          <hr />
          <div className='user__menu__list'>
            <div className='user__menu__list__item'>
              <Button
                state='transparent'
                type='button'
                size='block'
                onClick={logOutUser}
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
