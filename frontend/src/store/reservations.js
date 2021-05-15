import { fetch } from './csrf';

const SET_TIMESLOTS = 'reservations/set_timeslots';
const SET_USER_FUTURE_RESERVATIONS = 'reservations/set_user_reservations';

const setAvilableTimeslots = (availableTimeslots) => ({
  type: SET_TIMESLOTS,
  payload: availableTimeslots,
});
const setUserReservations = (reservations) => ({
  type: SET_USER_FUTURE_RESERVATIONS,
  payload: reservations,
});

export const getAvailReservationsByCart = (cartId, dateTime) => async (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ dateTime }),
  };
  const res = await fetch(`/api/reservations/${cartId}/available`, options);
  const pivot = (res.data.length / 2);
  const timesToDisplay = res.data.slice(pivot - 2, pivot + 3);
  dispatch(setAvilableTimeslots(timesToDisplay));
};

export const makeReservation = (newReservation) => async (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(newReservation),
  };
  const res = await fetch(`/api/reservations/${newReservation.cartId}/new`, options);
  // TODO: Complete reservation process
};

export const getUserFutureReservations = (userId) => async (dispatch) => {
  const url = `/api/users/${userId}/reservations/future`;
  const reservations = await fetch(url);
  if (reservations.data.length) {
    dispatch(setUserReservations(reservations.data));
  }
};

const initialState = {
  availableTimeslots: null,
  userFutureReservations: null,
  userPreviousReservations: null,
};
export default function reservationsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TIMESLOTS: {
      const newState = {
        ...state,
        availableTimeslots: action.payload,
      };
      return newState;
    }
    case SET_USER_FUTURE_RESERVATIONS: {
      const newState = {
        ...state,
        userFutureReservations: action.payload,
      };
      return newState;
    }
    default:
      return state;
  }
}
