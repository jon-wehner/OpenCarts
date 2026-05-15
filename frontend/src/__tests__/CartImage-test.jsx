import React from 'react';
import { cleanup, render } from '@testing-library/react';
import CartImage from '../components/CartDetailElements/CartImage';

afterEach(cleanup);

it('CartImage renders an image with correct src and alt attributes', () => {
  const { queryByAltText } = render(
    <CartImage name="my-cart" imageUrl="my-cart.jpg" />,
  );
  const img = queryByAltText('my-cart');
  expect(img).toBeTruthy();
  expect(img.getAttribute('src')).toBe('my-cart.jpg');
});
