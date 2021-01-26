import { fetch } from './csrf'

const PLACEHOLDER = 'PLACERHOLDER'

const carts = await fetch('/api/carts');
const initialState = {
  carts: null
}

export default function cartsReducer (state= initialState, action) {
  switch(action.type) {
    case PLACEHOLDER:{
      return
    }
    default:
      return state
  }
}
