import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCarts } from '../../store/carts'
import CartDetail from './CartDetail'
import './CartCarousel.css'

export default function CartCarousel () {
  const dispatch = useDispatch();
  const carts = useSelector(state => Object.values(state.carts))
  /* const [currCarts, setCurrCarts] = useState(carts.slice(0,4));
  const [prevCarts, setPrevCarts] = useState([]);
  const [nextCarts, setNextCarts] = useState(carts.slice(3,8));
  Carts include every cart in our db
  We want to render 0-3, then 4-7
  on page load currCarts = carts.slice(0,3) */

  useEffect(() => {
    dispatch(getCarts());

  },[dispatch])
  if (!carts) {
    return null;
  }
  return (
    <div className="carousel">
    {carts.map(cart=> {
      return <CartDetail key={cart.id} cart={cart} />
    })}
    </div>
  )
}


