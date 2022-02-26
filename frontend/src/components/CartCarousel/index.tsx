import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllCarts } from '../../store/carts';
import CartDetail from './CartDetail';
import './CartCarousel.css';
import { RootState } from '../../store';
import { Cart } from '../../interfaces';

// TODO: Refactor Carousel logic to cleanup null typing issue
export default function CartCarousel() {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.carts.list);

  const [prev, setPrev] = useState<number | null>(null);
  const [curr, setCurr] = useState<number>(0);
  const [next, setNext] = useState<number | null>(4);

  useEffect(() => {
    dispatch(getAllCarts());
  }, [dispatch]);

  const loadNext = () => {
    const lastIdx = carts.length - 1;
    setPrev(curr);
    if (next) {
      setCurr(next);
    }
    if (next && next + 4 < lastIdx) {
      setNext(next + 4);
    } else {
      setNext(null);
    }
  };

  const loadPrev = () => {
    setNext(curr);
    if (prev) {
      setCurr(prev);
    }
    if (prev && prev - 4 > 0) {
      setPrev(prev - 4);
    } else {
      setPrev(null);
    }
  };

  if (!carts) {
    return null;
  }
  return (
    <div className="carousel">
      {prev !== null && <FontAwesomeIcon className="carousel__arrow" onClick={loadPrev} icon={faArrowAltCircleLeft} />}
      {carts.slice(curr, curr + 4).map((cart: Cart) => <CartDetail key={cart.id} cart={cart} />)}
      {next && <FontAwesomeIcon className="carousel__arrow" icon={faArrowAltCircleRight} onClick={loadNext} />}
    </div>
  );
}
