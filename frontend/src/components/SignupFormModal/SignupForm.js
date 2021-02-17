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

  const onSubmit = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signupUser({
        email,
        username,
        password
      }))
        .catch(res => {
          if (res.data.errors) setErrors(res.data.errors)
        });
    }
    return setErrors(['Password fields must match.'])
  }
  return (
    <form className="signupForm" onSumbit={onSubmit}>
      <ul>
        {errors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
      <div>
        <label className="signupForm__label">Email:</label>
        <input className="signupForm__input" type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="signupForm__label">Username:</label>
        <input className="signupForm__input" type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label className="signupForm__label">Password:</label>
        <input className="signupForm__input" type="password" value={password} onChange={e=> setPassword(e.target.value)} />
      </div>
      <div>
        <label className="signupForm__label">Confirm Password:</label>
        <input className="signupForm__input" type="password" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} />
      </div>
      <button className="signupForm__btn" type="submit">Sign Up</button>
    </form>
  );
}

export default SignupForm
