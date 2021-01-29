import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getReviewsByCart } from '../../store/reviews';

export default function CartReviewSnippet ({cartId}) {
  const dispatch = useDispatch()
  const reviews = useSelector(state=> state.reviews[cartId])
  console.log(reviews)
  if(!reviews || reviews.length === 0) {
    return null
  }
  return (
    <p className="cartDetail__review">{reviews[0].review}</p>
  )
}
