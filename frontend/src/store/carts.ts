import { AnyAction } from 'redux';
import { fetch } from './csrf';
import { Cart, CustomResponse } from '../interfaces';
import { AppDispatch } from '.';

const LOAD = 'carts/load';
const SEARCH = 'carts/search';

const loadCarts = (carts: Cart[]) => ({ type: LOAD, carts });

const searchCarts = (carts: Cart[]) => ({ type: SEARCH, carts });

export const getAllCarts = () => async (dispatch: AppDispatch) => {
  const res: CustomResponse = await fetch('/api/carts');
  dispatch(loadCarts(res.data));
};

export const getCartsByQuery = (query: string) => async (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ query }),
  };
  const res: CustomResponse = await fetch('/api/carts', options);
  dispatch(searchCarts(res.data));
};
const initialState = { list: null, searchResults: null };

export default function cartsReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case LOAD: {
      const newState = {
        ...state,
        list: action.carts,
      };
      return newState;
    }
    case SEARCH: {
      const newState = {
        ...state,
        searchResults: action.carts,
      };
      return newState;
    }
    default:
      return state;
  }
}
