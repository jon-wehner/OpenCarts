import { useSelector } from 'react-redux'
import CartBigDetail from '../CartBigDetail'

export default function SearchResults () {
  const results = useSelector(state => state.carts.searchResults)
  if (!results) {
    return null
  }
  return (
    results.map(cart=> {
      return <CartBigDetail key={cart.id} cart={cart} />
    })
  )
}
