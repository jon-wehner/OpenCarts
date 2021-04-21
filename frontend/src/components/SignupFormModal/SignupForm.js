import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './SignupForm.css';

function SignupForm () {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user)
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState([]);

  if(sessionUser) return <Redirect to="/" />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([]);
    const user = await dispatch(sessionActions.signupUser({
        email,
        username,
        password,
        confirmPassword
    }));
    if (!user.errors) {
      return
    }
    else {
      setErrors(user.errors)
    }
  }

  return (
    <form className="signupForm" onSubmit={handleSubmit}>
      <ul>
        {errors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
      <label className="signupForm__label">Email:
        <input className="signupForm__input" type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label className="signupForm__label">Username:
        <input className="signupForm__input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label className="signupForm__label">Password:
        <input className="signupForm__input" type="password" value={password} onChange={e=> setPassword(e.target.value)} />
      </label>
      <label className="signupForm__label">Confirm Password:
        <input className="signupForm__input" type="password" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} />
      </label>
      <button className="signupForm__btn" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm
