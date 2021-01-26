import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCarts } from '../../store/carts'

export default function CartCarousel () {
  const dispatch = useDispatch();
  const carts = useSelector(state => Object.values(state.carts))

  useEffect(() => {
    dispatch(getCarts())
  },[dispatch])
  if (!carts) {
    return null;
  }
  return (
    <ul>
    {carts.map(cart=> {
      return <li key={cart.id}>{cart.name}</li>
    })}
    </ul>
  )
}


