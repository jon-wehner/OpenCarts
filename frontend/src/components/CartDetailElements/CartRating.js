import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import './CartDetails.css'

export default function CartRating ({cartId}) {
  const reviews = useSelector(state=> state.reviews[cartId])
  const ratings = []
  if (reviews) {
    reviews.forEach(review => ratings.push(review.rating))
  }
  const avgRating = ratings.reduce((acc, curr) => {
    return acc + curr }, 0) / ratings.length;
  if(Number.isNaN(avgRating) || !reviews) {
    return (
      <p className="cartDetails__rating">No Reviews Yet</p>
    )
  }
  const roundedRating = Math.round(avgRating)
  let stars = []
  for (let i = 0; i<roundedRating; i++) {
    stars.push(<FontAwesomeIcon key={i} className="cartDetails__filledStar" icon={faStar} />)
  }
  let ratingText = ""
  switch (roundedRating) {
    case 5:
      ratingText = 'Exceptional';
      break;
    case 4:
      ratingText = 'Good';
      break
    case 3:
      ratingText = 'OK';
      break;
    case 2:
      ratingText = 'Not the best';
      break;
    case 1:
      ratingText = 'Bad';
      break;
    default:
      ratingText = ""
  }

  return (
    <div className="cartDetails__rating">
      {stars}
      <p className="cartDetails__ratingText">{ratingText}</p>
    </div>

  )
}
