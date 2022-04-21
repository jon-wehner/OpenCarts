import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TimeSelect from './TimeSelect';
import { tzOffsetToString, getInitialTimeValue } from '../../utils/utils';
import CartCarousel from '../CartCarousel';
import './BookingArea.css';

export default function BookingArea() {
  const navigate = useNavigate();
  const now = new Date();
  const today = now.toLocaleDateString('en-CA', { day: '2-digit', year: 'numeric', month: '2-digit' });
  const [query, setQuery] = useState('');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState(getInitialTimeValue(now));
  const [partySize, setPartySize] = useState('0');
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const offset = now.getTimezoneOffset() / 60;
    const offsetString = tzOffsetToString(offset);
    const dateTime = `${date}T${time}${offsetString}`;
    navigate(`/search?query=${query}?date=${dateTime}?party=${partySize}`);
  };

  return (
    <div>
      <div className="booking-area">
        <div className="booking-area__formWrapper">
          <h1 className="booking-area__title">Local & Delicious</h1>
          <form className="booking-area__form" onSubmit={handleSubmit}>
            <input
              className="reservationSearch__inputs"
              value={date}
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <TimeSelect onTimeChange={setTime} />
            <select
              className="reservationSearch__inputs"
              onChange={(e) => setPartySize(e.target.value)}
            >
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
            <input
              className="reservationSearch__inputs"
              placeholder="Restaurant or Cuisine"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn reservationSearch__btn" type="submit">
              Skip the Line
            </button>
          </form>
        </div>
      </div>
      <CartCarousel />
    </div>
  );
}
