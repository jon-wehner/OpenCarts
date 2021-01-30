import { useDispatch, useSelector } from "react-redux"
import { makeReservation } from "../../store/reservations";
import './CartDetails.css'

export default function CartReservations({cartId, userId}) {
  const dispatch = useDispatch();
  const availableTimeslots = useSelector(state => state.reservations.availableTimeslots)
  const pendingReservation = useSelector(state => state.reservations.pendingReservation)
  if(!availableTimeslots) {
    return null
  }
  const reserve = (e) => {
    console.log('click')
    const newRes = {...pendingReservation}
    newRes.dateTime = e.target.value;
    newRes.cartId = cartId;
    newRes.userId = userId;
    dispatch(makeReservation(newRes))
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
