export default function CartDetail ({ cart, states }) {
  return (
    <div>
      <img src={cart.imageUrl} />
      <h1>{cart.name}</h1>
      <p>{`${cart.address}, ${cart.city},`}</p>
    </div>
  )
}
