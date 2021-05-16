import './CartDetails.css';

export default function CartPrice({ priceLevel }) {
  const grayedDollars = 4 - priceLevel;
  return (
    <div className="cartDetails__price">
      <span className="cartDetails__greenPrice">{'$'.repeat(priceLevel)}</span>
      <span className="cartDetails__grayPrice">{'$'.repeat(grayedDollars)}</span>
    </div>
  );
}
