import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCarts, getNextCarts, getPrevCarts } from '../../store/carts'
import CartDetail from './CartDetail'
import './CartCarousel.css'

export default function CartCarousel () {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.carts.list);
  const currentCarts = useSelector(state => state.carts.current)
  const prevCarts = useSelector(state => state.carts.prev)
  const nextCarts = useSelector(state => state.carts.next)

  const next = () => {
    dispatch(getNextCarts())
  }

  const prev = () => {
    dispatch(getPrevCarts())
  }
  useEffect(() => {
    dispatch(getCarts());
  },[dispatch]);

  if (!carts) {
    return null;
  }
  return (
    <div className="carousel">

      {prevCarts.length > 0 && <button onClick={prev}>Prev</button>}
      {Object.values(currentCarts).map(cart=> {
        return <CartDetail key={cart.id} cart={cart} />
      })}
      {nextCarts.length > 0 && <button onClick={next}>Next</button>}
    </div>
  )
}


