import { fetch } from './csrf'

const LOAD = 'carts/load'
const SEARCH = 'carts/search'

const loadCarts = (carts) => {
  return {
    type: LOAD,
    carts
  }
};

const searchCarts = (carts) => {
  return {
    type: SEARCH,
    carts
  }
}
export const getAllCarts = () => async dispatch => {
  const res = await fetch('/api/carts');
  dispatch(loadCarts(res.data))
};

export const getCartsByQuery = (query) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({query})
  }
  const res = await fetch('/api/carts', options)
  dispatch(searchCarts(res.data))
}
const initialState = {}

export default function cartsReducer (state= initialState, action) {
  switch(action.type) {
    case LOAD: {
      const newState = {
        ...state,
        list: action.carts
      }
      return newState;
    }
    case SEARCH: {
      const newState = {
        ...state,
        searchResults: action.carts
      }
      return newState;
    }
    default:
      return state
  }
}

