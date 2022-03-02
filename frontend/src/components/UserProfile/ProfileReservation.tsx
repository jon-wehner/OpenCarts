import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../../Context/Modal';
import CartImage from '../CartDetailElements/CartImage';
import { cancelReservation } from '../../store/reservations';
import ReservationForm from '../ReservationForm';
import { Reservation } from '../../interfaces';
import './ProfileReservation.css';

export default function ProfileReservation({ reservation }: { reservation: Reservation }) {
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCancelModel, setShowCancelModal] = useState(false);
  const date = new Date(reservation.dateTime);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const timeValue = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  const cart = reservation.Cart;

  const handleCancel = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowCancelModal(false);
    await dispatch(cancelReservation(reservation.id, reservation.userId));
  };
  return (
    <div className="profileReservation">
      <h3>{cart.name}</h3>
      <CartImage name={cart.name} imageUrl={cart.imageUrl} />
      <div>
        <span>{date.toLocaleDateString()}</span>
        <span> </span>
        <span>{time}</span>
      </div>
      <span>
        {reservation.partySize}
        {' guests'}
      </span>
      <button type="button" onClick={() => setShowEditModal(true)}>
        Change
      </button>
      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <ReservationForm
            cart={cart}
            userId={reservation.userId}
            initialDateTime={reservation.dateTime}
            initialPartySize={reservation.partySize}
            initialTime={timeValue}
            edit
            id={reservation.id}
          />
        </Modal>
      )}
      <button type="button" onClick={() => setShowCancelModal(true)}>
        Cancel
      </button>
      {showCancelModel && (
        <Modal onClose={() => setShowCancelModal(false)}>
          <form className="cancelForm" onSubmit={handleCancel}>
            Are you sure you want to cancel this reservation?
            <button type="submit">Confirm Cancellation</button>
          </form>
        </Modal>
      )}
    </div>
  );
}
