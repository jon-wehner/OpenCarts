import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import './CartDetails.css';

export default function CartReviewSnippet({ cartId }: {cartId: number}) {
  const reviews = useSelector((state: RootState) => state.reviews[cartId]);
  if (!reviews || reviews.length === 0) {
    return null;
  }
  return (
    <p className="cartDetails__review">{reviews[0].review}</p>
  );
}
