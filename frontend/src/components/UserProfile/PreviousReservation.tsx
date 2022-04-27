import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExistingReservation } from '../../interfaces';
import { RootState } from '../../store';
import { getReviewsByCart, postReview } from '../../store/reviews';
import CartImage from '../CartDetailElements/CartImage';
import './ProfileReservation.css';
import ReviewRating from './ReviewRating';

export default function ProfileReservation({ reservation }: { reservation: ExistingReservation}) {
  const dispatch = useDispatch();
  const [review, setReview] = useState('');
  const [userReview, setUserReview] = useState('');
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const date = new Date(reservation.dateTime);
  const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const cart = reservation.Cart;
  const cartReviews = useSelector((state: RootState) => state.reviews[cart.id]);

  useEffect(() => {
    dispatch(getReviewsByCart(cart.id));
  }, [cart.id, dispatch]);

  useEffect(() => {
    let resReview;
    if (Array.isArray(cartReviews) && cartReviews.length) {
      resReview = cartReviews.find((el) => el.userId === reservation.userId);
    }
    if (resReview) setUserReview(resReview.review);
  }, [cartReviews, reservation.userId]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      review,
      // TODO: Implement Rating
      rating,
      userId: reservation.userId,
      cartId: reservation.cartId,
      reservationId: reservation.id,
    };
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
        {reservation.reviewed && userReview}
        {!reservation.reviewed && <button type="button" onClick={() => setShowReview(!showReview)}>{showReview ? 'Hide Review Form' : 'Leave a review'}</button>}
        {showReview && (
        <form onSubmit={handleSubmit} className="reviewForm">
          <ReviewRating setRating={setRating} />
          <label htmlFor="review">
            <textarea rows={4} onChange={(e) => setReview(e.target.value)} />
          </label>
          <button type="submit">
            Submit Review
          </button>
        </form>
        )}

      </div>
    </div>
  );
}
