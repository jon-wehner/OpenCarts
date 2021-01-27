import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCarts } from '../../store/carts'
import CartDetail from './CartDetail'

export default function CartCarousel () {
  const dispatch = useDispatch();
  const carts = useSelector(state => Object.values(state.carts))


  useEffect(() => {
    dispatch(getCarts());

  },[dispatch])
  if (!carts) {
    return null;
  }
  return (
    <ul>
    {carts.map(cart=> {
      return <CartDetail key={cart.id} cart={cart} />
    })}
    </ul>
  )
}


