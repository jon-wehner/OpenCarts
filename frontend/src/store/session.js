import { fetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const loginUser = (user) => async (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
  };
  const res = await fetch('/api/session', options);
  dispatch(setUser(res.data.user));
};

export const restoreUser = () => async (dispatch) => {
  const res = await fetch('/api/session');
  if (res.data.user) {
    dispatch(setUser(res.data.user));
  }
};

export const signupUser = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  };
  try {
    const res = await fetch('api/users', options);
    dispatch(setUser(res.data.user));
    return res.data;
  } catch (err) {
    return err.data;
  }
};

export const logoutUser = () => async (dispatch) => {
  const res = await fetch('/api/session', { method: 'DELETE' });
  dispatch(removeUser());
  return res;
};

const initialState = {
  user: null,
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      const newState = {
        ...state,
        user: action.user,
      };
      return newState;
    }
    case REMOVE_USER: {
      const newState = {
        ...state,
        user: null,
      };
      return newState;
    }
    default:
      return state;
  }
}
