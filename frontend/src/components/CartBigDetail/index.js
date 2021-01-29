import CartImage from '../CartDetailElements/CartImage'
import CartTitle  from '../CartDetailElements/CartName'
import CartPrice from '../CartDetailElements/CartPrice'
import { getAvailReservationsByCart } from '../../store/reservations'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
export default function CartBigDetail ({cart}) {
  const dispatch = useDispatch()
  const pendingReservation = useSelector(state=> state.reservations.pendingReservation);
  //Look up reservations with cart.id
  //where time is within 2.5 hours
  //create a timeslot array
  //if we find two reservations with that time delete that slot from our timeslots array
  //return the available time slots to the front end
  useEffect(() => {
    dispatch(getAvailReservationsByCart(cart.id,pendingReservation.dateTime))
  })
  return (
    <>
      <CartImage name={cart.name} imageUrl={cart.imageUrl} />
      <CartTitle name={cart.name} />
      <CartPrice priceLevel={cart.priceLevel} />
    </>
  )
}
