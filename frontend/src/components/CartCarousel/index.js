import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCarts } from '../../store/carts'
import CartDetail from './CartDetail'
import './CartCarousel.css'

export default function CartCarousel () {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.carts.list);
  const [prev, setPrev] = useState(0);
  const [curr, setcurr] = useState(4);
  const [next, setNext] = useState(8);

  useEffect(() => {
    dispatch(getAllCarts());
  },[dispatch]);


  const loadNext = () => {
    setPrev(curr)
    setcurr(curr + 4)
    setNext(next+4)
  }

  if (!carts) {
    return null;
  }
  return (
    <>
      <div className="carousel">
        {carts.slice(curr, curr + 4).map(cart=> {
          return <CartDetail key={cart.id} cart={cart} />
        })}
      </div>
      <button onClick={loadNext}>Next</button>
    </>
  )
}


