import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { loginUser, clearErrors } from '../../store/session';
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
  const errors = useSelector((state: RootState) => state.session.errors);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearErrors());
    dispatch(loginUser({ credential, password }));
  };
  const demoLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(loginUser({
      credential: 'demo',
      password: 'password',
    }));
  };
  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <ul>
        {errors && errors.map((error: string) => (
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
