import './CartDetail.css'

export default function CartDetail ({ cart }) {
  return (
    <div className="cartDetail">
      <img className="cartDetail__cartImage" src={cart.imageUrl} alt={cart.name}/>
      <h1 className="cartDetail__title">{cart.name}</h1>
      <p className="cartDetail__address">{`${cart.address}, ${cart.city}, ${cart.State.name}`}</p>
      <div className="cartDetail__infoContainer">
        <p className="cartDetail__info">{cart.Cuisine.name}</p>
        <p className="cartDetail__info cartDetail__price">{'$'.repeat(cart.priceLevel)}</p>
      </div>
    </div>
  )
}
