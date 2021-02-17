import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import './Navigation.css';
import LoginFormModal from '../LoginFormModal'
import SignupFormModal from '../SignupFormModal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal  />
        <SignupFormModal />
      </>
    );
  }

  return (
    <ul className="navbar">
        <h1 className="navbar__title">OpenCarts</h1>
        <NavLink className="navbar__link" exact to="/"><FontAwesomeIcon className="nav__icon" icon={faHome} /></NavLink>
        {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
