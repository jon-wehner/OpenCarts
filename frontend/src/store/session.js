import { fetch } from './csrf'
const LOGIN = 'session/LOGIN'
const LOGOUT = 'session/LOGOUT'

const login = (user) => ({
  type: LOGIN,
  user
});

const logout =() => ({
  type: LOGOUT
})

 export const loginUser = (user) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user)
  }
  const res = await fetch('/api/session', options);
  if(res.ok) {
    dispatch(login(res.data.user));
  }

}

const initialState = {
  user: null
}

export default function sessionReducer (state = initialState, action) {
  switch(action.type) {
    case LOGIN: {
      const newState = {...state,
        user: action.user
      }
      return newState;
    }
    case LOGOUT: {
      const newState = {...state,
        user: null
      };
      return newState
    }
    default:
      return state
  }
}
