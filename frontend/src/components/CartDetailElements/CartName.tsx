import React from 'react';

interface CartTitleProps {
  name: string;
}
export default function CartTitle({ name }: CartTitleProps) {
  return (
    <span className="cartDetails__name">{name}</span>
  );
}
