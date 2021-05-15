import { useState } from 'react';
import { Modal } from '../../Context/Modal';
import CartImage from '../CartDetailElements/CartImage';
import ReservationForm from '../ReservationForm';

export default function ProfileReservation({ reservation }) {
  const [showModal, setShowModal] = useState();
  const date = new Date(reservation.dateTime);
  const cart = reservation.Cart;
  return (
    <div className="profileReservation">
      <h3>{cart.name}</h3>
      <CartImage name={cart.name} imageUrl={cart.imageUrl} />
      <div>
        <span>{date.toLocaleDateString()}</span>
        <span> </span>
        <span>{date.toLocaleTimeString('en-US')}</span>
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
            initialDateTime={date}
            
          />
        </Modal>
      )}
    </div>
  );
}
