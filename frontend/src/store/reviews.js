import { fetch } from './csrf'

const LOAD = '/reviews/load'

const loadReviews = (reviews, cartId) => {
  return {
    type: LOAD,
    reviews,
    cartId
  }
}

export const getReviewsByCart = (cartId) => async dispatch => {
  const res = await fetch(`/api/reviews/${cartId}`)
  dispatch(loadReviews(res.data, cartId));
}

const initialState = {}
export default function reviewsReducer (state = initialState, action) {
  switch(action.type) {
    case LOAD: {
      const newState = {
        ...state,
        [action.cartId]: action.reviews
      }
      return newState
    }
    default:
      return state;
  }
}
