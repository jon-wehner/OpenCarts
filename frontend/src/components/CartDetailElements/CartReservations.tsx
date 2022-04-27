import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from '../../Context/Modal';
import { Cart } from '../../interfaces';
import { RootState } from '../../store';
import { getCalendarDateValue } from '../../utils/utils';
import ReservationForm from '../ReservationForm';
import './CartDetails.css';

interface CartReservationsProps {
  cart: Cart;
  userId: number,
  partySize: string,

}

export default function CartReservations({
  cart, userId, partySize,
}: CartReservationsProps) {
  const [resTime, setResTime] = useState('');
  const [resDate, setResDate] = useState('');
  const availTimeSlots = useSelector((state: RootState) => state.reservations.availableTimeSlots);
  const [showModal, setShowModal] = useState(false);

  if (!availTimeSlots) {
    return null;
  }
  return (
    <div className="cartDetails__buttonContainer">
      {availTimeSlots.map((time: string) => {
        const date = new Date(time);
        const innerText = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const calendarDate = getCalendarDateValue(date);
        return (
          <button
            key={time}
            type="button"
            className="reservation__btn"
            onClick={() => {
              setShowModal(true);
              setResTime(date.toLocaleTimeString('en-GB'));
              setResDate(calendarDate);
            }}
          >
            {innerText}
          </button>
        );
      })}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReservationForm
            cart={cart}
            userId={userId}
            initialDate={resDate}
            initialPartySize={partySize}
            initialTime={resTime}
          />
        </Modal>
      )}
    </div>
  );
}
