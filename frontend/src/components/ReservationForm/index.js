import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReservation, getAvailReservationsByCart, makeReservation } from '../../store/reservations';
import TimeSelect from '../BookingArea/TimeSelect';
import tzOffsetToString from '../../utils/utils';
import './ReservationForm.css';

export default function ReservationForm({
  cart, userId,
  initialDateTime, initialPartySize, initialTime, edit,
}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState(initialDateTime.slice(0, 10));
  const [time, setTime] = useState(initialTime);
  const [partySize, setPartySize] = useState(initialPartySize);

  const reserve = (e) => {
    e.preventDefault();
    let offset = (new Date().getTimezoneOffset() / 60);
    offset = tzOffsetToString(offset);
    const dateTime = `${date}T${time}${offset}`;
    const newRes = {
      cartId: cart.id,
      userId,
      partySize,
      dateTime,
    };
    if (edit) {
      dispatch(editReservation(newRes));
    } else {
      dispatch(makeReservation(newRes));
    }
    dispatch(getAvailReservationsByCart(cart.id, dateTime));
  };

  return (
    <form className="reservationForm" onSubmit={reserve}>
      <h2>
        New Reservation at
        {cart.name}
      </h2>
      <input className="" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <TimeSelect onTimeChange={setTime} initialTime={time} />
      <select className="" value={partySize} onChange={(e) => setPartySize(e.target.value)}>
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
      <button type="submit">Make Reservation</button>
    </form>
  );
}
