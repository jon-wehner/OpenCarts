import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import './SignupForm.css';

function SignupFormPage () {
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
    <form onSumbit={onSubmit}>
      <ul>
        {errors.map((err, i) => <li key={i}>{err}</li>)}
      </ul>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={e=> setPassword(e.target.value)} />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input type="password" value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)} />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage
