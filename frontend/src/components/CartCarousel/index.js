import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCarts } from '../../store/carts'
import CartDetail from './CartDetail'
import './CartCarousel.css'

export default function CartCarousel () {
  const dispatch = useDispatch();
  const carts = useSelector(state => Object.values(state.carts));

  useEffect(() => {
    dispatch(getCarts());
    setCurrCarts(carts.slice(0,4))
    setNextCarts(carts.slice(3,7))

  },[dispatch]);

  if (!carts) {
    return null;
  }
  return (
    <div className="carousel">
      {carts.map(cart=> {
        return <CartDetail key={cart.id} cart={cart} />
      })}
    {/* <button>Next</button> */}
    </div>
  )
}


