import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.loginUser({ credential, password })).catch(
      (res) => {
        if (res.data && res.data.errors) setErrors(res.data.errors);
      }
    );
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="loginForm__label">
        Username or Email:
        <input
          type="text"
          value={credential}
          className="loginForm__input"
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className="loginForm__label">
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
      <button className="loginForm__btn" type="submit">Log In</button>
    </form>
  );
}

export default LoginForm;
