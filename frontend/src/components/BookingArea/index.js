import ReservationSearch from "../ReservationSearch";
import SearchBar from "../SearchBar";
import { useState } from 'react'


export default function BookingArea () {
  const [query, setQuery] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [party, setParty] = useState(1)
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  console.log(query)
  return (
    <div>
      <h1>Skip the Line</h1>
      <form onSubmit={handleSubmit}>
        <ReservationSearch onDateChange={setDate} onTimeChange={setTime} onPartyChange={setParty}/>
        <SearchBar value={query} onInputChange={setQuery}/>
        <button type="submit">Wouldst thou like to live deliciously?</button>
      </form>
    </div>
  )
}

