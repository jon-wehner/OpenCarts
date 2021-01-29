import { useSelector } from "react-redux"
import './CartReservations.css'

export default function CartReservations({reservations, date, time}) {
  const availableTimeslots = useSelector(state => state.reservations.availableTimeslots)
  const pendingReservation = useSelector(state => state.reservations.pendingReservation)
  if(!availableTimeslots.length) {
    return null
  }
  return (
    <div>
      {availableTimeslots.map(time => {
        const innerText =  time.slice(11,16)
          return <button className="reservation__btn" value={time}>{innerText}</button>
      })}
    </div>

  )
}
