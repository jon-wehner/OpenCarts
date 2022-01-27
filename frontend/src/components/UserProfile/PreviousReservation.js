import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsByCart, postReview } from '../../store/reviews';
import CartImage from '../CartDetailElements/CartImage';
import './ProfileReservation.css';

export default function ProfileReservation({ reservation }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const date = new Date(reservation.dateTime);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const cart = reservation.Cart;
  const userReview = useSelector((state) => state.reviews[cart.id].find(el => el.userId === reservation.userId))
  console.log(userReview)
  useEffect (() => {
    dispatch(getReviewsByCart(cart.id))
  }, [cart.id, dispatch])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      review, 
      rating: 4,
      userId: reservation.userId,
      cartId: reservation.cartId,
      reservationId: reservation.id,
    }
    await dispatch(postReview(data));    
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
      <div>
        {reservation.reviewed ? userReview.review : <form onSubmit={handleSubmit} className="reviewForm">
          <label htmlFor="review">
            Leave a review            
          </label>
          <textarea name="review" type="text" rows="4" onChange={(e) => setReview(e.target.value)} />
          <button>
            Submit Review
          </button>
        </form>}
        
      </div>
    </div>
  );
}
