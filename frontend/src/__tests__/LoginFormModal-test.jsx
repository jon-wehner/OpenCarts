/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import { reducer } from '../store';
import { ModalProvider } from '../Context/Modal';
import LoginFormModal from '../components/LoginFormModal';
import { testState } from './testState';

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

function renderModal(preloadedState = testState) {
  const store = configureStore({ reducer, preloadedState });
  return rtlRender(
    <Provider store={store}>
      <ModalProvider>
        <LoginFormModal />
      </ModalProvider>
    </Provider>,
  );
}

describe('LoginFormModal', () => {
  it('renders a "Log In" button', () => {
    renderModal();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('does not show the modal before the button is clicked', () => {
    renderModal();
    expect(screen.queryByRole('textbox')).toBeNull();
  });

  it('shows the login form after clicking "Log In"', async () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    // The modal renders credential and password fields
    const inputs = document.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0);
  });
});
