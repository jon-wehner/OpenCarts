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
  const pivot = res.data.length / 2;
  const timesToDisplay = res.data.slice(pivot - 2, pivot + 3);
  dispatch(setAvilableTimeslots(timesToDisplay));
};

export const makeReservation = (newReservation) => async (dispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(newReservation),
  };
  const res = await fetch('/api/reservations/new', options);
  // TODO: Complete reservation process
};

export const getUserFutureReservations = (userId) => async (dispatch) => {
  const url = `/api/users/${userId}/reservations/future`;
  const reservations = await fetch(url);
  console.log(reservations);
  if (reservations.data) {
    dispatch(setUserReservations(reservations.data));
  }
};

export const editReservation = (reservationId, dateTime, partySize, userId) => async (dispatch) => {
  const url = `/api/reservations/${reservationId}`;
  const options = {
    method: 'PATCH',
    body: JSON.stringify({ dateTime, partySize, userId }),
  };
  const userReservations = await fetch(url, options);
  if (userReservations.data) {
    dispatch(setUserReservations(userReservations.data));
  }
};

export const cancelReservation = (reservationId, userId) => async (dispatch) => {
  const url = `/api/reservations/${reservationId}`;
  const options = {
    method: 'DELETE',
    body: JSON.stringify({ userId }),
  };
  const userReservations = await fetch(url, options);
  if (userReservations.data) {
    dispatch(setUserReservations(userReservations.data));
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
