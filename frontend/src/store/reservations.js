import { fetch } from './csrf';

const SEARCH = 'reservations/search'
const BUILD = 'reservations/build'

const lookUpReservations = () => {
  return {
    type: SEARCH,
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
  console.log(options)
  const reservations = await fetch(`/api/reservations/${cartId}`, options)
  console.log(reservations)
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
    default:
      return state
  }
}
