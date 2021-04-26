import { useState, useEffect} from "react";
import { useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  }
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logoutUser());
  }

  useEffect(() => {
    if(!showMenu) return

    const closeMenu = () => {
      setShowMenu(false);
    }
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu])

  return (
    <div className="dropdown">
      {showMenu && (
        <ul className="dropdown__list">
          <li>{user.username}</li>
          <li>My Reservations</li>
          <li>Favorites</li>
          <li>
            <button className="dropdown__logout" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
      <div>
        <button className="dropdown__button" onClick={openMenu}>
          <FontAwesomeIcon className="dropdown__fontIcon" icon={faUser} />
        </button>
      </div>

    </div>
  )
}

export default ProfileButton;
