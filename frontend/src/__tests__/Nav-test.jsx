import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { render } from './testUtils';
import { testState } from './testState';
import App from '../App';

describe('NavBar', () => {
  beforeEach(() => {
    // `/api/carts` (and most reducer-feeding routes) returns an array; returning
    // `{}` here would land `{}` in state.carts.list and crash CartCarousel.
    global.fetch = jest.fn((url) => {
      const isSession = typeof url === 'string' && url.includes('/api/session');
      return Promise.resolve({
        ok: true,
        status: 200,
        headers: { get: () => 'application/json' },
        json: () => Promise.resolve(isSession ? {} : []),
      });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders Log In and Sign Up buttons when there is no user in session', () => {
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </MemoryRouter>,
      { preloadedState: { ...testState, session: { user: null, errors: [] } } },
    );
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  test('shows the profile button instead of Log In when a user is in session', () => {
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.queryByRole('button', { name: /log in/i })).toBeNull();
  });
});
