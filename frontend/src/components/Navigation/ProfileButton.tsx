import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import * as sessionActions from '../../store/session';
import './ProfileButton.css';

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  };
  const logout = () => {
    dispatch(sessionActions.logoutUser());
  };

  useEffect(() => {
    if (!showMenu) return undefined;

    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <div className="dropdown">
      {showMenu && (
        <ul className="dropdown__list">
          <li>
            <Link to="/profile">My Profile</Link>
          </li>
          {/* <li>My Reservations</li>
          <li>Favorites</li> */}
          <li>
            <button className="dropdown__logout" type="button" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
      <div>
        <button className="dropdown__button" type="button" onClick={openMenu}>
          <FontAwesomeIcon className="dropdown__fontIcon" icon={faUser} />
        </button>
      </div>
    </div>
  );
}

export default ProfileButton;
