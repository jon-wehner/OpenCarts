import { useSelector } from "react-redux"
import './CartReservations.css'

export default function CartReservations({reservations, date, time}) {
  const availableTimeslots = useSelector(state => state.reservations.availableTimeslots)
  const pendingReservation = useSelector(state => state.reservations.pendingReservation)
  if(!availableTimeslots) {
    return null
  }
  return (
    <div>
      {availableTimeslots.map(time => {
        time = new Date(time);
        const innerText = time.toLocaleTimeString([],{ hour: '2-digit', minute: '2-digit'})
          return <button className="reservation__btn" value={time}>{innerText}</button>
      })}
    </div>

  )
}
