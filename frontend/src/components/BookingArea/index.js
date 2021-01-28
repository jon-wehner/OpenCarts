import ReservationSearch from "../ReservationSearch";
import SearchBar from "../SearchBar";
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
      <h1>Local & Delicious</h1>
      <form onSubmit={handleSubmit}>
        <ReservationSearch onDateChange={setDate} onTimeChange={setTime} onPartyChange={setParty}/>
        <SearchBar value={query} onInputChange={setQuery}/>
        <button type="submit">Skip the Line</button>
      </form>
    </div>
  )
}

