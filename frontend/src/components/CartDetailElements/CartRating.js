import { useSelector } from 'react-redux'

export default function CartRating ({cartId}) {
  const reviews = useSelector(state=> state.reviews[cartId])
  const ratings = []
  if (reviews) {
    reviews.forEach(review => ratings.push(review.rating))
  }
  const avgRating = ratings.reduce((acc, curr) => {
    return acc + curr }, 0) / ratings.length

  return (
    <p>{avgRating}</p>
  )
}
