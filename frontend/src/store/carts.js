import { fetch } from './csrf'

const LOAD = 'carts/load'
const NEXT = 'carts/next'
const PREV = 'carts/prev'

const loadCarts = (carts) => {
  return {
    type: LOAD,
    carts
  }
}

const nextCarts = () => {
  return {
    type: NEXT
  }
}

const prevCarts = () => {
  return {
    type: PREV
  }
}

export const getNextCarts = () => async dispatch => {
  dispatch(nextCarts())
}

export const getPrevCarts = () => async dispatch => {
  dispatch(prevCarts())
}



export const getCarts = () => async dispatch => {
  const res = await fetch('/api/carts');
  const carts = { list: res.data}
  const keys = Object.keys(carts.list);
  carts.keys = keys
  const currKeys = keys.slice(0,4)
  const nextKeys = keys.slice(3,7)
  carts.current = currKeys.map(key => carts.list[key])
  carts.prev = []
  carts.next = nextKeys.map(key => carts.list[key])
  carts.pivot = 3
  dispatch(loadCarts(carts))
}
const initialState = {
  list: null,
  keys: null,
  pivot: null,
  next: null,
  current: null,
  prev: null,
}

export default function cartsReducer (state= initialState, action) {
  switch(action.type) {
    case LOAD: {
      const newState = {...state, ...action.carts
      }
      return newState;
    }
    case NEXT: {
      const newState = {...state}
      newState.pivot = newState.pivot + 3
      const nextKeys = newState.keys.slice(newState.pivot, newState.keys.length)
      newState.current = newState.next
      newState.prev = newState.current
      newState.next = nextKeys.map(key => state.list[key])
      return newState
    }
    case PREV: {
      const newState = {...state}
      const prevKeys = state.keys.slice(state.pivot-3, state.pivot+1)
      newState.pivot = state.pivot- 3
      newState.current = state.prev
      newState.next = state.current
      if (newState.pivot <= 3){
        newState.prev = []
      } else {
        newState.prev = prevKeys.map(key => state.list[key])
      }
      return newState;
    }
    default:
      return state
  }
}

