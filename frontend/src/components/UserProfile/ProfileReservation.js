import CartImage from '../CartDetailElements/CartImage';

export default function ProfileReservation({ reservation }) {
  const date = new Date(reservation.dateTime);
  const cart = reservation.Cart;
  return (
    <div className="profileReservation">
      <h3>{cart.name}</h3>
      <CartImage name={cart.name} imageUrl={cart.imageUrl} />
      <div>
        <span>{date.toLocaleDateString()}</span>
        <span> </span>
        <span>{date.toLocaleTimeString('en-US')}</span>
      </div>
      <span>
        {reservation.partySize}
        {' guests'}
      </span>
    </div>
  );
}
