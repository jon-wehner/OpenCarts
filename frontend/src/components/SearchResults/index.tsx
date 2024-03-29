import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Cart } from '../../interfaces';
import { RootState } from '../../store';
import { getCartsByQuery } from '../../store/carts';
import CartBigDetail from '../CartBigDetail';

export default function SearchResults() {
  const location = useLocation();
  const dispatch = useDispatch();
  const query = location.search.split('?')[1].split('=')[1];
  const results = useSelector((state: RootState) => state.carts.searchResults);
  useEffect(() => {
    dispatch(getCartsByQuery(query));
  }, [dispatch, query]);
  if (!results) {
    return null;
  }
  return (
    results.map((cart: Cart) => <CartBigDetail key={cart.id} cart={cart} />)
  );
}
