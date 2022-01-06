import './CartDetail.css';

export default function CartDetail({ cart }) {
  return (
    <div className="cartDetail">
      <img className="cartDetail__cartImage" src={cart.imageUrl} alt={cart.name} />
      <h1 className="cartDetail__title">{cart.name}</h1>
      <span className="cartDetail__address">{`${cart.address}`}</span>
      <span className="cartDetail__address">{`${cart.city}, ${cart.State.name}`}</span>
      <div className="cartDetail__infoContainer">
        <span className="cartDetail__info">{cart.Cuisine.name}</span>
        <span className="cartDetail__info cartDetail__price">{'$'.repeat(cart.priceLevel)}</span>
      </div>
    </div>
  );
}
