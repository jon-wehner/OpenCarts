export default function CartDetail ({ cart }) {
  return (
    <div>
      <img src={cart.imageUrl} />
      <h1>{cart.name}</h1>
      <p>{`${cart.address}, ${cart.city}, ${cart.State.name}`}</p>
      <p>Cuisine: {cart.Cuisine.name}</p>
      <p>Price: {'$'.repeat(cart.priceLevel)}</p>
    </div>
  )
}
