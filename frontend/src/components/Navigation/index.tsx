import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { RootState } from '../../store';

function Navigation({ isLoaded }: {isLoaded: boolean}) {
  const sessionUser = useSelector((state: RootState) => state.session.user);
  const location = useLocation();

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <nav className="navbar">
      <h1 className="navbar__title">OpenCarts</h1>
      <div>
        {location.pathname !== '/' && <NavLink className="navbar__link" to="/"><FontAwesomeIcon className="nav__icon" icon={faHome} /></NavLink>}
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
