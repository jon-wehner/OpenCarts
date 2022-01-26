import { fetch } from './csrf';

const LOAD = '/reviews/load';

const loadReviews = (reviews, cartId) => ({
  type: LOAD,
  reviews,
  cartId,
});

export const getReviewsByCart = (cartId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${cartId}`);
  dispatch(loadReviews(res.data, cartId));
};

export const postReview = (review) => async (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(review)
  }
  try {
    const res = await fetch('api/reviews', options)
    if (res.ok) {
      dispatch(getReviewsByCart(review.cartId))
    }
  } catch(err) {
    return err.data;
  }
};

const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD: {
      const newState = {
        ...state,
        [action.cartId]: action.reviews,
      };
      return newState;
    }
    default:
      return state;
  }
}
