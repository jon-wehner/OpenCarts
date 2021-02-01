import TimeSelect from './TimeSelect'
import './ReservationSearch.css'

export default function ReservationSearch ({onDateChange, onTimeChange, onPartyChange, onSearchChange}) {
  return (
    <div className="reservationSearch__fields">
      <div className="reservationSearch__inputWrapper">
        <input className="reservationSearch__inputs" type="date" onChange={e=> onDateChange(e.target.value)}/>
        <TimeSelect onTimeChange={onTimeChange}/>
      </div>
      <div className="reservationSearch__inputWrapper">
        <select className="reservationSearch__inputs" onChange={e=> onPartyChange(e.target.value)}>
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
          onChange={e => onSearchChange(e.target.value)}/>
        </div>
        <button className="btn reservationSearch__btn" type="submit">Skip the Line</button>

      </div>
    </div>

  )
}
