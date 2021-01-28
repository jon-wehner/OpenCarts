import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCarts } from '../../store/carts'
import CartDetail from './CartDetail'
import './CartCarousel.css'

export default function CartCarousel () {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.carts.list);

  useEffect(() => {
    dispatch(getAllCarts());
  },[dispatch]);

  if (!carts) {
    return null;
  }
  return (
    <div className="carousel">
      {Object.values(carts).map(cart=> {
        return <CartDetail key={cart.id} cart={cart} />
      })}
    </div>
  )
}


