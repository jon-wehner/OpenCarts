import { useState } from 'react';
import { Modal } from '../../Context/Modal';
import CartImage from '../CartDetailElements/CartImage';
import ReservationForm from '../ReservationForm';

export default function ProfileReservation({ reservation }) {
  const [showModal, setShowModal] = useState();
  const date = new Date(reservation.dateTime);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const timeValue = date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
  const cart = reservation.Cart;
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
      <button type="button" onClick={() => setShowModal(true)}>Change</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
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
    </div>
  );
}
