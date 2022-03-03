import React from 'react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { render } from './testUtils';
import App from '../App';

describe('Login component', () => {
  test('The NavBar Renders', async () => {
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </MemoryRouter>,
    );
    const loginButton = screen.getByRole('button', { name: /log in/i });
    expect(loginButton);
  });
});
