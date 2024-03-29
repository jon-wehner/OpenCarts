import { AnyAction } from 'redux';
import { AppDispatch } from '.';
import { CustomResponse, Error, User } from '../interfaces';
import { fetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_ERRORS = 'session/setErrors';
const CLEAR_ERRORS = 'session/clearErrors';

const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const setErrors = (errors: Error) => ({
  type: SET_ERRORS,
  payload: errors,
});

export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});

export const loginUser = (user: {credential: string, password: string}) => async (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
  };
  try {
    const res: CustomResponse = await fetch('/api/session', options);
    dispatch(setUser(res.data.user));
  } catch (err: any) {
    dispatch(setErrors(err.data.errors));
  }
};

export const restoreUser = () => async (dispatch: AppDispatch) => {
  const res: CustomResponse = await fetch('/api/session');
  if (res.data.user) {
    dispatch(setUser(res.data.user));
  }
};

export const signupUser = (user: User) => async (dispatch: AppDispatch) => {
  const {
    username, email, password, confirmPassword,
  } = user;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password,
      confirmPassword,
    }),
  };
  try {
    const res: CustomResponse = await fetch('api/users', options);
    dispatch(setUser(res.data.user));
  } catch (err: any) {
    dispatch(setErrors(err.data.errors));
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  const res = await fetch('/api/session', { method: 'DELETE' });
  dispatch(removeUser());
  return res;
};

const initialState = {
  user: null,
  errors: [],
};

export default function sessionReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_USER: {
      const newState = {
        ...state,
        user: action.payload,
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
    case SET_ERRORS: {
      const newState = {
        ...state,
        errors: action.payload,
      };
      return newState;
    }
    case CLEAR_ERRORS: {
      const newState = {
        ...state,
        errors: [],
      };
      return newState;
    }
    default:
      return state;
  }
}
