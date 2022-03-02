import React from 'react';
import './CartDetails.css';

interface CartPriceProps {
  priceLevel: number;
}
export default function CartPrice({ priceLevel }: CartPriceProps) {
  const grayedDollars = 4 - priceLevel;
  return (
    <div className="cartDetails__price">
      <span className="cartDetails__greenPrice">{'$'.repeat(priceLevel)}</span>
      <span className="cartDetails__grayPrice">{'$'.repeat(grayedDollars)}</span>
    </div>
  );
}
