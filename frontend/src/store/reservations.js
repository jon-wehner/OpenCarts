import { fetch } from './csrf';

const SET_TIMESLOTS= 'reservations/set_timeslots'

const setAvilableTimeslots = (availableTimeslots) => {
  return {
    type: SET_TIMESLOTS,
    payload: availableTimeslots
  }
}

export const getAvailReservationsByCart = (cartId, dateTime) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify({dateTime})
  }
  const res = await fetch(`/api/reservations/${cartId}/available`, options)
  const pivot = (res.data.length/2)
  const timesToDisplay =  res.data.slice(pivot- 2, pivot + 3)
  dispatch(setAvilableTimeslots(timesToDisplay))

};

export const makeReservation = (newReservation) => async dispatch =>{
  const options = {
    method: 'POST',
    body: JSON.stringify(newReservation)
  }
  const res = await fetch(`/api/reservations/${newReservation.cartId}/new`, options)
  //TODO: Complete reservation process
}

const initialState = {}
export default function reservationsReducer (state = initialState, action) {
  switch(action.type) {
    case SET_TIMESLOTS: {
      const newState = {
        ...state,
        availableTimeslots: action.payload
      }
      return newState
    }
    default:
      return state
  }
}
