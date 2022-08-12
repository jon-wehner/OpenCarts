import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Cart } from '../../interfaces';
import { RootState } from '../../store';

type CartProfileParams = {
  cartId: string
}

export default function CartProfile() {
  const { cartId } = useParams<keyof CartProfileParams>();
  const cart = useSelector((state: RootState) => state.carts.list.find((el: Cart) => el.id === parseInt(cartId, 10)));

  return (
    <p>
      here lyeth the profile of the cart you clicked cart id:
      {cartId}
    </p>
  );
}
