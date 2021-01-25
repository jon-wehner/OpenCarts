import { fetch } from './csrf'
const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};


export const loginUser = (user) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user)
  }
  const res = await fetch('/api/session', options);
  if(res.ok) {
    dispatch(setUser(res.data.user));
  }
};

export const restoreUser = () => async dispatch => {
  const res = await fetch('/api/session')
  dispatch(setUser(res.data.user))
  return res
};

export const signupUser = (user) => async dispatch => {
  const { username, email, password } = user;
  const options =  {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    }),
  };
  const res = await fetch('api/users', options)
  dispatch(setUser(res.data.user));
  return res
};

export const logoutUser = () => async dispatch => {
  const res = await fetch('/api/session', {
    method: 'DELETE'});
  dispatch(removeUser());
  return res
}


const initialState = {
  user: null
}

export default function sessionReducer (state = initialState, action) {
  switch(action.type) {
    case SET_USER: {
      const newState = {...state,
      user: action.user
      }
      return newState;
    }
    case REMOVE_USER: {
      const newState = {...state,
        user: null
      };
      return newState
    }
    default:
      return state
  }
}
