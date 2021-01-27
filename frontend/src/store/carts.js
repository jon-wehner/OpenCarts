import { fetch } from './csrf'

const LOAD = 'carts/load'

const loadCarts = (carts) => {
  return {
    type: LOAD,
    carts
  }
}

export const getCarts =() => async dispatch => {
  const res = await fetch('/api/carts');
  dispatch(loadCarts(res.data))
}
const initialState = {}

export default function cartsReducer (state= initialState, action) {
  switch(action.type) {
    case LOAD: {
      const newState = {...state, ...action.carts
      }
      return newState;
    }
    default:
      return state
  }
}
