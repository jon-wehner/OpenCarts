import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import './Navigation.css';

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
        <NavLink className="navbar__link" to="/login">Log In</NavLink>
        <NavLink className="navbar__link" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="navbar">
        <NavLink className="navbar__link" exact to="/"><FontAwesomeIcon className="nav__icon" icon={faHome} /></NavLink>
        {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;