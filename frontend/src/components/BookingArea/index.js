import ReservationSearch from "../ReservationSearch";
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './BookingArea.css'
import { getCartsByQuery } from '../../store/carts'


export default function BookingArea () {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [party, setParty] = useState(1)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query)
    dispatch(getCartsByQuery(query))
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

