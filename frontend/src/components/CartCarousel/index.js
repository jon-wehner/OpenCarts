import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllCarts } from '../../store/carts'
import CartDetail from './CartDetail'
import './CartCarousel.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function CartCarousel () {
  const dispatch = useDispatch();
  const carts = useSelector(state => state.carts.list);
  const [prev, setPrev] = useState(false);
  const [curr, setCurr] = useState(0);
  const [next, setNext] = useState(4);

  useEffect(() => {
    dispatch(getAllCarts());
  },[dispatch]);


  const loadNext = () => {
    const lastIdx = carts.length - 1
    setPrev(curr)
    setCurr(next)
    if (next + 4 > lastIdx) {
      setNext(false)
    }
    else {
      setNext(next+4)
    }
  }

  const loadPrev = () => {
    setNext(curr)
    setCurr(prev)
    if (prev -4 < 0) {
      setPrev(false)
    }
    else {
      setPrev(prev-4)
    }
  }

  if (!carts) {
    return null;
  }
  return (
    <>
      {prev !== false && <button onClick={loadPrev}>Prev</button>}
      <div className="carousel">
        {carts.slice(curr, curr + 4).map(cart=> {
          return <CartDetail key={cart.id} cart={cart} />
        })}
      </div>
      {next !== false && <FontAwesomeIcon icon={faArrowRight} onClick={loadNext}/>}
    </>
  )
}


