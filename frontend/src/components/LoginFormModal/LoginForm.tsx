import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LoginForm.css';

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: '80%',
};

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleSubmit = async () => {
    setErrors([]);
    dispatch(sessionActions.loginUser({ credential, password }));
    // TODO: implement error catching for login
  };
  const demoLogin = () => {
    dispatch(sessionActions.loginUser({
      credential: 'demo',
      password: 'password',
    }));
  };
  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
      <label className="loginForm__label" htmlFor="credential">
        Username or Email:
        <input
          type="text"
          value={credential}
          className="loginForm__input"
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className="loginForm__label" htmlFor="password">
        Password:
        <input
          type="password"
          value={password}
          className="loginForm__input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <span />
      <div style={buttonContainerStyle}>
        <button className="loginForm__btn" type="submit">Log In</button>
        <button className="loginForm__btn" type="button" onClick={demoLogin}>Demo User</button>
      </div>
    </form>
  );
}

export default LoginForm;
