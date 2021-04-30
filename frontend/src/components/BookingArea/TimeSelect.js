import { useEffect } from "react"

export default function TimeSelect ({onTimeChange, time}) {
  useEffect(() => {
    console.log(time)
  })
  return (
    <select className="reservationSearch__inputs" value={time ? time : "00:00:00"} onChange={e=> onTimeChange(e.target.value)} >
      <option value="00:00:00">12:00AM</option>
      <option value="00:30:00">12:30AM</option>
      <option value="01:00:00">1:00AM</option>
      <option value="01:30:00">1:30AM</option>
      <option value="02:00:00">2:00AM</option>
      <option value="02:30:00">2:30AM</option>
      <option value="03:00:00">3:00AM</option>
      <option value="03:30:00">3:30AM</option>
      <option value="04:00:00">4:00AM</option>
      <option value="04:30:00">4:30AM</option>
      <option value="05:00:00">5:00AM</option>
      <option value="05:30:00">5:30AM</option>
      <option value="06:00:00">6:00AM</option>
      <option value="06:30:00">6:30AM</option>
      <option value="07:00:00">7:00AM</option>
      <option value="07:30:00">7:30AM</option>
      <option value="08:00:00">8:00AM</option>
      <option value="08:30:00">8:30AM</option>
      <option value="09:00:00">9:00AM</option>
      <option value="09:30:00">9:30AM</option>
      <option value="10:00:00">10:00AM</option>
      <option value="10:30:00">10:30AM</option>
      <option value="11:00:00">11:00AM</option>
      <option value="11:30:00">11:30AM</option>
      <option value="12:00:00">12:00PM</option>
      <option value="12:30:00">12:30PM</option>
      <option value="13:00:00">01:00PM</option>
      <option value="13:30:00">01:30PM</option>
      <option value="14:00:00">02:00PM</option>
      <option value="14:30:00">02:30PM</option>
      <option value="15:00:00">03:00PM</option>
      <option value="15:30:00">03:30PM</option>
      <option value="16:00:00">04:00PM</option>
      <option value="16:30:00">04:30PM</option>
      <option value="17:00:00">05:00PM</option>
      <option value="17:30:00">05:30PM</option>
      <option value="18:00:00">06:00PM</option>
      <option value="18:30:00">06:30PM</option>
      <option value="19:00:00">07:00PM</option>
      <option value="19:30:00">07:30PM</option>
      <option value="19:00:00">07:00PM</option>
      <option value="19:30:00">07:30PM</option>
      <option value="20:00:00">08:00PM</option>
      <option value="20:30:00">08:30PM</option>
      <option value="21:00:00">09:00PM</option>
      <option value="21:30:00">09:30PM</option>
      <option value="22:00:00">10:00PM</option>
      <option value="22:30:00">10:30PM</option>
      <option value="23:00:00">10:00PM</option>
      <option value="23:30:00">11:30PM</option>
    </select>
  )
}
