import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getCartsByQuery } from '../../store/carts';
import CartBigDetail from '../CartBigDetail';

export default function SearchResults() {
  const location = useLocation();
  const dispatch = useDispatch();
  const query = location.search.split('?')[1].split('=')[1];
  const results = useSelector((state) => state.carts.searchResults);
  useEffect(() => {
    dispatch(getCartsByQuery(query));
  }, [dispatch, query]);
  if (!results) {
    return null;
  }
  return (
    results.map((cart) => <CartBigDetail key={cart.id} cart={cart} />)
  );
}
