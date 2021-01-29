import CartImage from '../CartDetailElements/CartImage'
import CartTitle  from '../CartDetailElements/CartName'
import CartPrice from '../CartDetailElements/CartPrice'
import CartRating from '../CartDetailElements/CartRating'
import CartReservations from '../CartDetailElements/CartReservations'
import CartReviewSnippet from '../CartDetailElements/CartReviewSnippet'
import { getAvailReservationsByCart } from '../../store/reservations'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getReviewsByCart } from '../../store/reviews'

export default function CartBigDetail ({cart}) {
  const dispatch = useDispatch()
  const pendingReservation = useSelector(state=> state.reservations.pendingReservation)
  const userId = useSelector(state=> state.session.user.id)
  const reviews = useSelector(state => state.reviews.cartId);

  useEffect(() => {
    dispatch(getAvailReservationsByCart(cart.id,pendingReservation.dateTime))
    dispatch(getReviewsByCart(cart.id));
  },[dispatch])

  return (
    <>
      <CartImage name={cart.name} imageUrl={cart.imageUrl} />
      <CartTitle name={cart.name} />
      <CartPrice priceLevel={cart.priceLevel} />
      <CartReservations userId={userId} cartId={cart.id}/>
      <CartReviewSnippet cartId={cart.id} />
      <CartRating cartId={cart.id}/>
    </>
  )
}
