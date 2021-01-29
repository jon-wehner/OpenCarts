import CartImage from '../CartDetailElements/CartImage'
import CartTitle  from '../CartDetailElements/CartName'
import CartPrice from '../CartDetailElements/CartPrice'
import { getAvailReservationsByCart } from '../../store/reservations'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import CartReservations from '../CartDetailElements/CartReservations'
export default function CartBigDetail ({cart}) {
  const dispatch = useDispatch()
  const pendingReservation = useSelector(state=> state.reservations.pendingReservation);
  useEffect(() => {
    dispatch(getAvailReservationsByCart(cart.id,pendingReservation.dateTime))
  })
  return (
    <>
      <CartImage name={cart.name} imageUrl={cart.imageUrl} />
      <CartTitle name={cart.name} />
      <CartPrice priceLevel={cart.priceLevel} />
      <CartReservations />
    </>
  )
}
