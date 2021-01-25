import { useState, useEffect} from "react";
import { useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';

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
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user" />
      </button>
      {showMenu && (
        <ul className="dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  )
}

export default ProfileButton;
