import { useState } from "react";
import { useDispatch } from "react-redux";
import { getAvailReservationsByCart, makeReservation } from "../../store/reservations";
import TimeSelect from "../BookingArea/TimeSelect";

export default function ReservationForm ({cart, userId, initialDateTime, initialPartySize}) {
  const dispatch = useDispatch()
  const [dateTime, setDateTime] = useState(initialDateTime)
  const [partySize, setPartySize] = useState(initialPartySize)

  const reserve = (e) => {
    const newRes = {
      dateTime,
      cartId: cart.id,
      userId,
      partySize
    }
    dispatch(makeReservation(newRes))
    dispatch(getAvailReservationsByCart(cart.id, dateTime))
  }

  return (
    <form onSubmit={reserve}>
      <h2>New Reservation</h2>
      <TimeSelect onTimeChange={setDateTime} time={dateTime.slice(11,19)}/>
      <select className="" value={partySize} onChange={e=> setPartySize(e.target.value)}>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="7">7 People</option>
              <option value="8">8 People</option>
              <option value="9">9 People</option>
              <option value="10">10 People</option>
      </select>
      <button>Make Reservation</button>
    </form>
  )
}
