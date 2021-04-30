import { useState } from 'react'
import { useDispatch } from 'react-redux'
import './BookingArea.css'
import TimeSelect from './TimeSelect'
import { useHistory } from "react-router-dom";
import { buildReservation } from '../../store/reservations';
import { tzOffsetToString } from '../../utils/utils'


export default function BookingArea () {
  const dispatch = useDispatch();
  const history = useHistory();
  const [query, setQuery] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [partySize, setPartySize] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault();
    let offset = (new Date().getTimezoneOffset() / 60);
    offset = tzOffsetToString(offset)
    const dateTime =`${date}T${time}${offset}`

    history.push({
      pathname:'/search',
      search: `?query=${query}?date=${dateTime}?party=${partySize}`
    });
  }

  return (
    <div className="booking-area">
      <div className="booking-area__formWrapper">
        <h1 className="booking-area__title">Local & Delicious</h1>
        <form className="booking-area__form" onSubmit={handleSubmit}>
        <div className="reservationSearch__fields">
          <div className="reservationSearch__inputWrapper">
            <input className="reservationSearch__inputs" type="date" onChange={e=> setDate(e.target.value)}/>
            <TimeSelect onTimeChange={setTime}/>
          </div>
          <div className="reservationSearch__inputWrapper">
            <select className="reservationSearch__inputs" onChange={e=> setPartySize(e.target.value)}>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="7">7 People</option>
              <option value="8">8 People</option>
              <option value="9">9 People</option>
              <option value="10">10 People</option>
            </select>
          </div>
          <div>
            <div className="reservationSearch__inputWrapper">
              <input className="reservationSearch__inputs"
              type="text"
              onChange={e => setQuery(e.target.value)}/>
            </div>
            <button className="btn reservationSearch__btn" type="submit">Skip the Line</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

