import React from 'react';
import './CartDetails.css';

interface CartImageProps {
  name: string;
  imageUrl: string;
}
export default function CartImage({ name, imageUrl }: CartImageProps) {
  return (
    <img className="cartDetails__image" src={imageUrl} alt={name} />
  );
}
