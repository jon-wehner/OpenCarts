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


export const getReservationsByCart = (cartId, dateTime) => async dispatch => {
  const options = {
    method: 'POST',
    body: JSON.stringify(dateTime),
  }
  const reservations = await fetch(`/reservations/${cartId}`)
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
