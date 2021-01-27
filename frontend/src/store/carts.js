import { fetch } from './csrf'

/*
  Initial State:
  Pivot is 3
  curr = slice(pivot-3,pivot+1)
  next = slice(pivot, pivot+4)
  curr has carts 0, 1, 2, 3
  next has 3, 4 , 5, 6

  Hit Next Button:
  prev= CurrCarts
  pivot+3
  Pivot is 6
  curr = slice(pivot-3, pivot+1)
  next = slice(pivot, pivot+4)
  curr has 3, 4, 5, 6
  next has 6, 7, 8, 9
  currCarts = carts.slice(3,7)
  nextCarts = carts.slce(6,10)
  prevCarts =
  Carts include every cart in our db
  We want to render 0-3, then 4-7
  on page load currCarts = carts.slice(0,3) */

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
