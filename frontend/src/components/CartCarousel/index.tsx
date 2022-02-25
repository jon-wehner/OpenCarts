import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllCarts } from '../../store/carts';
import CartDetail from './CartDetail';
import './CartCarousel.css';
import { RootState } from '../../store';

export default function CartCarousel() {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.carts.list);

  const [prev, setPrev] = useState<Number | null>(null);
  const [curr, setCurr] = useState<Number | null>(0);
  const [next, setNext] = useState<Number | null>(4);

  useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);

  const loadNext = () => {
    const lastIdx = carts.length - 1;
    setPrev(curr);
    setCurr(next);
    if (next + 4 > lastIdx) {
      setNext(null);
    } else {
      setNext(next + 4);
    }
  };

  const loadPrev = () => {
    setNext(curr);
    setCurr(prev);
    if (prev - 4 < 0) {
      setPrev(null);
    } else {
      setPrev(prev - 4);
    }
  };

  if (!carts) {
    return null;
  }
  return (
    <div className="carousel">
      {prev !== null && <FontAwesomeIcon className="carousel__arrow" onClick={loadPrev} icon={faArrowAltCircleLeft} />}
      {carts.slice(curr, curr + 4).map((cart) => <CartDetail key={cart.id} cart={cart} />)}
      {next && <FontAwesomeIcon className="carousel__arrow" icon={faArrowAltCircleRight} onClick={loadNext} />}
    </div>
  );
}
