import { useState } from 'react';
import CartImage from '../CartDetailElements/CartImage';
import './ProfileReservation.css';

export default function ProfileReservation({ reservation }) {
  const [review, setReview] = useState('');
  const date = new Date(reservation.dateTime);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const cart = reservation.Cart;
  
  const handleSubmit = () => {

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
      <form onSubmit={handleSubmit}>
        <label>
          Leave a review
          <input type="text" onChange={(e) => setReview(e.target.value)}>
          </input>
          <button>
            Submit Review
          </button>
        </label>
      </form>
    </div>
  );
}
