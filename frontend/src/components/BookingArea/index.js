import ReservationSearch from "../ReservationSearch";
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './BookingArea.css'
import { getCartsByQuery } from '../../store/carts'
import { useHistory } from "react-router-dom";


export default function BookingArea () {
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [party, setParty] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCartsByQuery(query))
    history.push("/search")


  }
  return (
    <div className="booking-area">
      <div className="booking-area__formWrapper">
        <h1 className="booking-area__title">Local & Delicious</h1>
        <form className="booking-area__form" onSubmit={handleSubmit}>
          <ReservationSearch onDateChange={setDate}
          onTimeChange={setTime}
          onPartyChange={setParty}
          onSearchChange={setQuery}/>
        </form>
      </div>

    </div>
  )
}

