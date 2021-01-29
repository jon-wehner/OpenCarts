import ReservationSearch from "../ReservationSearch";
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './BookingArea.css'
import { getCartsByQuery } from '../../store/carts'
import { useHistory } from "react-router-dom";
import { buildReservation } from "../../store/reservations";
import { $CombinedState } from "redux";


export default function BookingArea () {
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [partySize, setPartySize] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCartsByQuery(query));
    const dateTime =new Date(`${date}T${time}`)
    dispatch(buildReservation(dateTime, partySize))
    history.push("/search");
  }

  return (
    <div className="booking-area">
      <div className="booking-area__formWrapper">
        <h1 className="booking-area__title">Local & Delicious</h1>
        <form className="booking-area__form" onSubmit={handleSubmit}>
          <ReservationSearch onDateChange={setDate}
          onTimeChange={setTime}
          onPartyChange={setPartySize}
          onSearchChange={setQuery}/>
        </form>
      </div>

    </div>
  )
}

