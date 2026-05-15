/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import { ModalProvider } from '../Context/Modal';
import { reducer } from '../store';
import UserProfile from '../components/UserProfile';
import { testState } from './testState';

// Suppress fetch network errors from mounted side-effects
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      headers: { get: () => 'application/json' },
      json: () => Promise.resolve({}),
    }),
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

function renderProfile(preloadedState) {
  const store = configureStore({ reducer, preloadedState });
  return rtlRender(
    <Provider store={store}>
      <ModalProvider>
        <UserProfile />
      </ModalProvider>
    </Provider>,
  );
}

describe('UserProfile', () => {
  it('renders no greeting when there is no user in state', () => {
    renderProfile({
      ...testState,
      session: { user: null, errors: [] },
    });
    // UserProfile returns null when unauthenticated; no heading should appear
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('renders a greeting containing the username', () => {
    renderProfile(testState);
    expect(screen.getByText(/demo/i)).toBeInTheDocument();
  });

  it('shows "no upcoming reservations" when future reservations list is empty', () => {
    renderProfile({
      ...testState,
      reservations: {
        ...testState.reservations,
        userFutureReservations: [],
        userPreviousReservations: [],
      },
    });
    expect(screen.getByText(/no upcoming reservations/i)).toBeInTheDocument();
  });

  it('shows "Your Upcoming Reservations" heading when there are future reservations', () => {
    renderProfile(testState);
    expect(screen.getByText(/Your Upcoming Reservations/i)).toBeInTheDocument();
  });

  it('renders the cart name for each future reservation', () => {
    renderProfile(testState);
    // testState has one future reservation for 'sit-non-dignissimos'
    expect(screen.getByText('sit-non-dignissimos')).toBeInTheDocument();
  });

  it('shows "Past Reservations" heading when previous reservations exist', () => {
    renderProfile(testState);
    expect(screen.getByText(/Past Reservations/i)).toBeInTheDocument();
  });

  it('renders the cart name for each past reservation', () => {
    renderProfile(testState);
    // testState has two past reservations; check the first cart name
    expect(screen.getByText('quo-corporis-molestias')).toBeInTheDocument();
  });
});
