import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const user = await dispatch(sessionActions.signupUser({
      email,
      username,
      password,
      confirmPassword,
    }));
    if (!user.errors) {
      return;
    }
    setErrors(user.errors);
  };

  return (
    <form className="signupForm" onSubmit={handleSubmit}>
      <ul>
        {errors.map((err) => <li key={err}>{err}</li>)}
      </ul>
      <label className="signupForm__label" htmlFor="email">
        Email:
        <input className="signupForm__input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="signupForm__label" htmlFor="username">
        Username:
        <input className="signupForm__input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className="signupForm__label" htmlFor="password">
        Password:
        <input className="signupForm__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className="signupForm__label" htmlFor="confirm password">
        Confirm Password:
        <input className="signupForm__input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <button className="signupForm__btn" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm;
