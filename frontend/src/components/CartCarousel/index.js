import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllCarts } from '../../store/carts';
import CartDetail from './CartDetail';
import './CartCarousel.css';

export default function CartCarousel() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.carts.list);
  
  const [prev, setPrev] = useState(false);
  const [curr, setCurr] = useState(0);
  const [next, setNext] = useState(4);

  useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);

  const loadNext = () => {
    const lastIdx = carts.length - 1;
    setPrev(curr);
    setCurr(next);
    if (next + 4 > lastIdx) {
      setNext(false);
    } else {
      setNext(next + 4);
    }
  };

  const loadPrev = () => {
    setNext(curr);
    setCurr(prev);
    if (prev - 4 < 0) {
      setPrev(false);
    } else {
      setPrev(prev - 4);
    }
  };

  if (!carts) {
    return null;
  }
  return (
    <>
      <div className="carousel">
        {prev !== false && <FontAwesomeIcon className="carousel__arrow" onClick={loadPrev} icon={faArrowAltCircleLeft} />}
        {carts.slice(curr, curr + 4).map((cart) => <CartDetail key={cart.id} cart={cart} />)}
        {next !== false && <FontAwesomeIcon className="carousel__arrow" icon={faArrowAltCircleRight} onClick={loadNext} />}
      </div>
    </>
  );
}
