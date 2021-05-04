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
import './CartBigDetail.css'
import { useLocation } from 'react-router'

export default function CartBigDetail ({cart}) {
  const dispatch = useDispatch()
  const location = useLocation()
  const dateTime = location.search.split('?')[2].split('=')[1]
  const partySize = location.search.split('?')[3].split('=')[1]
  const user = useSelector(state=> state.session.user)

  useEffect(() => {
    dispatch(getAvailReservationsByCart(cart.id,dateTime))
    dispatch(getReviewsByCart(cart.id));
  },[dispatch, cart.id, dateTime])

  return (
    <div className="searchResults__cart">
      <CartImage name={cart.name} imageUrl={cart.imageUrl} />
      <CartTitle name={cart.name} />
      <CartPrice priceLevel={cart.priceLevel} />
      <CartRating cartId={cart.id}/>
      <CartReservations userId={user ? user.id : null}
        cart={cart}
        dateTime={dateTime}
        partySize={partySize}
        />
      <CartReviewSnippet cartId={cart.id} />
    </div>
  )
}
