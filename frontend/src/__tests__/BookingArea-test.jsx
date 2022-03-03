import React from 'react';
import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from './testUtils';
import BookingArea from '../components/BookingArea';

it('Booking form renders', () => {
  render(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <Routes>
        <Route path="/" element={<BookingArea />} />
      </Routes>
    </MemoryRouter>,
  );
  const date = new Date();
  const dateString = date.toLocaleDateString('en-CA', { day: '2-digit', year: 'numeric', month: '2-digit' });
  expect(screen.getByDisplayValue(dateString));
});
