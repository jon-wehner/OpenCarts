import ReservationSearch from "../ReservationSearch";
import SearchBar from "../SearchBar";
import { useState } from 'react'
import './BookingArea.css'


export default function BookingArea () {
  const [query, setQuery] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [party, setParty] = useState(1)
  const handleSubmit = (e) => {
    e.preventDefault();

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

