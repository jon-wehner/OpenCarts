import { fetch } from './csrf'

const LOAD = 'carts/load'

const loadCarts = (carts) => {
  return {
    type: LOAD,
    carts
  }
}

export const getCarts =() => {
  const carts = await fetch('/api/carts');
  dispatch(loadCarts(carts))
}
const initialState = {
  carts: null
}

export default function cartsReducer (state= initialState, action) {
  switch(action.type) {
    case LOAD: {
      const newState = {...state, carts: action.carts
      }
      return newState;
    }
    default:
      return state
  }
}
