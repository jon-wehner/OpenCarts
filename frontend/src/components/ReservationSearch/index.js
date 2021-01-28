import './ReservationSearch.css'

export default function ReservationSearch ({onDateChange, onTimeChange, onPartyChange}) {
  return (
    <div>
      <input type="date" onChange={e=> onDateChange(e.target.value)}/>
      <input type="time" step="900" min="11:00" max="20:00"onChange={e=> onTimeChange(e.target.value)}/>
      <select onChange={e=> onPartyChange(e.target.value)}>
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

  )
}
