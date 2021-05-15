import './CartDetails.css';

export default function CartImage({ name, imageUrl }) {
  return (
    <img className="cartDetails__image" src={imageUrl} alt={name} />
  );
}
