import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CartImage from '../CartDetailElements/CartImage';
import CartTitle from '../CartDetailElements/CartName';
import CartPrice from '../CartDetailElements/CartPrice';
import CartRating from '../CartDetailElements/CartRating';
import CartReservations from '../CartDetailElements/CartReservations';
import CartReviewSnippet from '../CartDetailElements/CartReviewSnippet';
import { getAvailReservationsByCart } from '../../store/reservations';
import { getReviewsByCart } from '../../store/reviews';
import { Cart } from '../../interfaces';
import { RootState } from '../../store';
import './CartBigDetail.css';

interface CartBigDetailProps {
  cart: Cart;
}
export default function CartBigDetail({ cart }: CartBigDetailProps) {
  const dispatch = useDispatch();
  const location = useLocation();
  const dateTime = location.search.split('?')[2].split('=')[1];
  const partySize = location.search.split('?')[3].split('=')[1];
  const user = useSelector((state: RootState) => state.session.user);

  useEffect(() => {
    dispatch(getAvailReservationsByCart(cart.id, dateTime));
    dispatch(getReviewsByCart(cart.id));
  }, [dispatch, cart.id, dateTime]);

  return (
    <div className="searchResults__cart">
      <div className="searchResults__imgContainer">
        <CartImage name={cart.name} imageUrl={cart.imageUrl} />
      </div>
      <div className="searchResults__textContainer">
        <CartTitle name={cart.name} />
        <CartPrice priceLevel={cart.priceLevel} />
        <CartRating cartId={cart.id} />
        <CartReviewSnippet cartId={cart.id} />
        <CartReservations
          userId={user ? user.id : null}
          cart={cart}
          partySize={partySize}
        />
      </div>
    </div>
  );
}
