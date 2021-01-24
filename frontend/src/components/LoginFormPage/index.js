import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './LoginForm.css'

function LoginFormPage () {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  if (sessionUser) return (
    <Redirect to='/' />
  )

  const handleSubmit= e => {
    e.preventDefault();
    const user = {
      credential,
      password}
    return dispatch(sessionActions.loginUser(user))
      .catch((res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors)
      })
  }
  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div>
        <label htmlFor="credential">Username or Email</label>
        <input value={credential} type="text" onChange={e=> setCredential(e.target.value)}/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" value={password} onChange={e=> setPassword(e.target.value)}/>
      </div>
        <button type="submit">Login</button>

    </form>
  )
}

export default LoginFormPage
