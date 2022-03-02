import { AnyAction } from 'redux';
import { AppDispatch } from '.';
import { CustomResponse, User } from '../interfaces';
import { fetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user: User) => ({
  type: SET_USER,
  user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

export const loginUser = (user: {credential: string, password: string}) => async (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
  };
  const res: CustomResponse = await fetch('/api/session', options);
  dispatch(setUser(res.data.user));
};

export const restoreUser = () => async (dispatch: AppDispatch) => {
  const res: CustomResponse = await fetch('/api/session');
  if (res.data.user) {
    dispatch(setUser(res.data.user));
  }
};

export const signupUser = (user: User) => async (dispatch: AppDispatch) => {
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
    const res: CustomResponse = await fetch('api/users', options);
    dispatch(setUser(res.data.user));
    return res.data;
  } catch (err: any) {
    return err.data;
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  const res = await fetch('/api/session', { method: 'DELETE' });
  dispatch(removeUser());
  return res;
};

const initialState = {
  user: null,
};

export default function sessionReducer(state = initialState, action: AnyAction) {
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
