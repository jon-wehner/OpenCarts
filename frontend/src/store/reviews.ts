import { AnyAction } from 'redux';
import { fetch } from './csrf';
import { CustomResponse, Review } from '../interfaces';
import { AppDispatch } from '.';

const LOAD = '/reviews/load';

const loadReviews = (reviews: Review[], cartId: number) => ({
  type: LOAD,
  payload: {
    reviews,
    cartId,
  },
});

export const getReviewsByCart = (cartId: number) => async (dispatch: AppDispatch) => {
  const res: CustomResponse = await fetch(`/api/reviews/${cartId}`);
  dispatch(loadReviews(res.data, cartId));
};

export const postReview = (review: Review) => async (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(review),
  };
  try {
    const res = await fetch('api/reviews', options);
    if (res.ok) {
      dispatch(getReviewsByCart(review.cartId));
      return res;
    }
  } catch (err: any) {
    return err.data;
  }
  return '';
};

interface reviewState {
  [id: string]: Review[]
}
const initialState = {};

// eslint-disable-next-line default-param-last
export default function reviewsReducer(
  state: reviewState = initialState,
  action: AnyAction,
) {
  switch (action.type) {
    case LOAD: {
      const newState = {
        ...state,
        [action.payload.cartId]: action.payload.reviews,
      };
      return newState;
    }
    default:
      return state;
  }
}
