import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from './testUtils';
import BookingArea from '../components/BookingArea';

describe('BookingArea', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve([]),
      }),
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function renderWithRouter(initialEntry = '/') {
    return render(
      <MemoryRouter initialEntries={[initialEntry]} initialIndex={0}>
        <Routes>
          <Route path="/" element={<BookingArea />} />
          <Route path="/search" element={<div data-testid="search-page" />} />
        </Routes>
      </MemoryRouter>,
    );
  }

  it('renders the date input pre-populated with today', () => {
    renderWithRouter();
    const date = new Date();
    const dateString = date.toLocaleDateString('en-CA', { day: '2-digit', year: 'numeric', month: '2-digit' });
    expect(screen.getByDisplayValue(dateString)).toBeInTheDocument();
  });

  it('renders the party-size select with 10 options', () => {
    renderWithRouter();
    const partySize = screen.getByTestId('party-size-select');
    expect(partySize.querySelectorAll('option').length).toBe(10);
  });

  it('renders the cuisine/restaurant query input and submit button', () => {
    renderWithRouter();
    expect(screen.getByPlaceholderText(/restaurant or cuisine/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /skip the line/i })).toBeInTheDocument();
  });

  it('navigates to /search when the form is submitted', () => {
    renderWithRouter();
    fireEvent.click(screen.getByRole('button', { name: /skip the line/i }));
    expect(screen.getByTestId('search-page')).toBeInTheDocument();
  });
});
