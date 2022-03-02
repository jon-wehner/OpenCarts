import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editReservation, makeReservation } from '../../store/reservations';
import TimeSelect from '../BookingArea/TimeSelect';
import tzOffsetToString from '../../utils/utils';
import './ReservationForm.css';
import { Cart } from '../../interfaces';
import { RootState } from '../../store';

interface ReservationFormProps {
  cart: Cart;
  userId: number;
  initialDateTime: string;
  initialPartySize: string | number;
  initialTime: string;
  edit?: boolean;
  id?: number;
}

export default function ReservationForm({
  cart, userId,
  initialDateTime, initialPartySize, initialTime, edit, id,
}: ReservationFormProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state: RootState) => state.session.user);
  const [date, setDate] = useState(initialDateTime.slice(0, 10));
  const [time, setTime] = useState(initialTime);
  const [partySize, setPartySize] = useState(initialPartySize);

  const reserve = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const offset = (new Date().getTimezoneOffset() / 60);
    const offsetString = tzOffsetToString(offset);
    const dateTime = `${date}T${time}${offsetString}`;
    const newRes = {
      cartId: cart.id,
      userId,
      partySize,
      dateTime,
    };
    if (edit && id) {
      dispatch(editReservation(id, dateTime, partySize, userId));
    } else {
      dispatch(makeReservation(newRes));
    }
    navigate('/profile');
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
      {sessionUser ? <button type="submit">Reserve</button> : <button type="button" id="noButton">Please log in to reserve</button>}
    </form>
  );
}
