import { useDispatch, useSelector } from "react-redux"
import { getAvailReservationsByCart, makeReservation } from "../../store/reservations";
import './CartDetails.css'

export default function CartReservations({cartId, userId, dateTime, partySize}) {
  const dispatch = useDispatch();
  const availableTimeslots = useSelector(state => state.reservations.availableTimeslots)
  if(!availableTimeslots) {
    return null
  }
  const reserve = (e) => {
    const newRes = {
      dateTime,
      cartId,
      userId,
      partySize
    }
    dispatch(makeReservation(newRes))
    dispatch(getAvailReservationsByCart(cartId, dateTime))
  }
  return (
    <div className="cartDetails__buttonContainer">
      {availableTimeslots.map(time => {
        time = new Date(time);
        const innerText = time.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit'})
          return <button className="reservation__btn" key={innerText} value={time} onClick={reserve}>{innerText}</button>
      })}
    </div>

  )
}
