import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, signupUser } from '../../store/session';
import { RootState } from '../../store';

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state: RootState) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const errors = useSelector((state: RootState) => state.session.errors);

  if (sessionUser) {
    navigate('/');
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearErrors());
    await dispatch(signupUser({
      email,
      username,
      password,
      confirmPassword,
    }));
  };

  return (
    <form className="authForm" onSubmit={handleSubmit}>
      <ul>
        {errors && errors.map((err: string) => <li key={err}>{err}</li>)}
      </ul>
      <label className="authForm__label" htmlFor="email">
        Email:
        <input className="authForm__input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="authForm__label" htmlFor="username">
        Username:
        <input className="authForm__input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className="authForm__label" htmlFor="password">
        Password:
        <input className="authForm__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className="authForm__label" htmlFor="confirm password">
        Confirm Password:
        <input className="authForm__input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <button className="authForm__btn" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
