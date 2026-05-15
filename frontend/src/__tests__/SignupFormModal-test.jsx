/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { reducer } from '../store';
import { ModalProvider } from '../Context/Modal';
import SignupFormModal from '../components/SignupFormModal';
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
      <MemoryRouter>
        <ModalProvider>
          <SignupFormModal />
        </ModalProvider>
      </MemoryRouter>
    </Provider>,
  );
}

describe('SignupFormModal', () => {
  it('renders a "Sign Up" button', () => {
    renderModal();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('does not show the modal before the button is clicked', () => {
    renderModal();
    // No form inputs until modal is open
    expect(screen.queryByPlaceholderText(/username/i)).toBeNull();
  });

  it('shows the signup form after clicking "Sign Up"', () => {
    renderModal();
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    const inputs = document.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0);
  });
});
