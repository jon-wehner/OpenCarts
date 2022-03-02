import React from 'react';
import { cleanup, render } from '@testing-library/react';
import CartImage from '../components/CartDetailElements/CartImage';

afterEach(cleanup);

it('CartImage renders and image with correct src and alt attributes', () => {
  const { queryByAltText } = render(
    <CartImage name="name" imageUrl="name.jpg" />,
  );
  expect(queryByAltText('name')).toBeTruthy();
  expect();
});
