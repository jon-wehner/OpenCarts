import { useSelector } from 'react-redux'
import './CartDetails.css'


export default function CartReviewSnippet ({cartId}) {
  const reviews = useSelector(state=> state.reviews[cartId])
  if(!reviews || reviews.length === 0) {
    return null
  }
  return (
    <p className="cartDetails__review">{reviews[0].review}</p>
  )
}
