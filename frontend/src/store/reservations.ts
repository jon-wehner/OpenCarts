import { AnyAction } from 'redux';
import { AppDispatch } from '.';
import { CustomResponse, ExistingReservation, NewReservation } from '../interfaces';
import { fetch } from './csrf';

const SET_TIMESLOTS = 'reservations/set_timeslots';
const SET_USER_RESERVATIONS = 'reservations/set_user_reservations';
const DELETE_RESERVATION = 'reservations/delete_reservation';

interface UserReservationsPayload {
  past: ExistingReservation[];
  future: ExistingReservation[];
}

const setAvailableTimeslots = (availableTimeslots: string[]) => ({
  type: SET_TIMESLOTS,
  payload: availableTimeslots,
});
const setUserReservations = (reservations: UserReservationsPayload) => ({
  type: SET_USER_RESERVATIONS,
  payload: reservations,
});
const deleteReservation = (id: number) => ({
  type: DELETE_RESERVATION,
  payload: id,
});
export const getAvailReservationsByCart = (
  cartId: number,
  dateTime: string,
) => async (dispatch: AppDispatch) => {
  const options = {
    method: 'POST',
    body: JSON.stringify({ dateTime }),
  };
  const res: CustomResponse = await fetch(`/api/reservations/${cartId}/available`, options);
  dispatch(setAvailableTimeslots(res.data));
};

export const makeReservation = (newReservation: NewReservation) => async () => {
  const options = {
    method: 'POST',
    body: JSON.stringify(newReservation),
  };
  await fetch('/api/reservations/new', options);
};

export const getUserReservations = (userId: number) => async (dispatch: AppDispatch) => {
  const url = `/api/users/${userId}/reservations`;
  const reservations: CustomResponse = await fetch(url);
  if (reservations.data) {
    dispatch(setUserReservations(reservations.data));
  }
};

export const editReservation = (
  reservationId: number,
  dateTime: string,
  partySize: string | number,
) => async (dispatch: AppDispatch) => {
  const url = `/api/reservations/${reservationId}`;
  const options = {
    method: 'PATCH',
    body: JSON.stringify({ dateTime, partySize }),
  };
  const userReservations: CustomResponse = await fetch(url, options);
  if (userReservations.data) {
    dispatch(setUserReservations(userReservations.data));
  }
};

export const cancelReservation = (
  reservationId: number,
) => async (dispatch: AppDispatch) => {
  const url = `/api/reservations/${reservationId}`;
  const options = {
    method: 'DELETE',
  };
  const userReservations: CustomResponse = await fetch(url, options);
  if (userReservations.data) {
    dispatch(deleteReservation(userReservations.data.id));
  }
};

interface reservationState {
  availableTimeSlots: null | string[],
  userFutureReservations: null | ExistingReservation[],
  userPreviousReservations: null | ExistingReservation[]
}

const initialState: reservationState = {
  availableTimeSlots: null,
  userFutureReservations: null,
  userPreviousReservations: null,
};
export default function reservationsReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case SET_TIMESLOTS: {
      const newState = {
        ...state,
        availableTimeSlots: action.payload,
      };
      return newState;
    }
    case SET_USER_RESERVATIONS: {
      const newState = {
        ...state,
        userFutureReservations: action.payload.future,
        userPreviousReservations: action.payload.past,
      };
      return newState;
    }
    case DELETE_RESERVATION: {
      if (state.userFutureReservations === null) return state;
      return {
        ...state,
        userFutureReservations: state.userFutureReservations.filter(
          (reservation) => reservation.id !== action.payload,
        ),
      };
    }
    default:
      return state;
  }
}
