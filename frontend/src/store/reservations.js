import { fetch } from './csrf';

const SET_TIMESLOTS= 'reservations/set_timeslots'
const BUILD = 'reservations/build'

const setAvilableTimeslots = (availableTimeslots) => {
  return {
    type: SET_TIMESLOTS,
    payload: availableTimeslots
  }
}

const build =(pendingReservation) => {
  return {
    type: BUILD,
    pendingReservation
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

export const buildReservation = (dateTime, partySize) => async dispatch =>  {
  const pendingReservation = {
    dateTime,
    partySize
  }
  dispatch(build(pendingReservation))
}

const initialState = {}
export default function reservationsReducer (state = initialState, action) {
  switch(action.type) {
    case BUILD: {
      const newState = {
        ...state,
        pendingReservation: action.pendingReservation
      }
      return newState
    }
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
