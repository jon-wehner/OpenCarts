/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
import { reducer } from '../store';
import SearchResults from '../components/SearchResults';
import { testState } from './testState';

// Mock window.fetch so API calls in effects return empty data and don't throw
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

// CartBigDetail parses the URL using multiple '?' segments — use that format
const searchUrl = '/search?query=tacos?dateTime=2042-01-27T08:30:00.000Z?partySize=2';

function renderSearchResults(preloadedState) {
  const store = configureStore({ reducer, preloadedState });
  return rtlRender(
    <Provider store={store}>
      <MemoryRouter initialEntries={[searchUrl]} initialIndex={0}>
        <Routes>
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  );
}

describe('SearchResults', () => {
  it('renders nothing when searchResults is null', () => {
    const { container } = renderSearchResults({
      ...testState,
      carts: { list: null, searchResults: null },
    });
    expect(container.firstChild).toBeNull();
  });

  it('renders one cart card per result', () => {
    renderSearchResults({
      ...testState,
      carts: { list: null, searchResults: testState.carts.list.slice(0, 3) },
    });
    // CartBigDetail renders a div.searchResults__cart for each cart
    const cartCards = document.querySelectorAll('.searchResults__cart');
    expect(cartCards.length).toBe(3);
  });

  it('renders cart names from search results', () => {
    renderSearchResults({
      ...testState,
      carts: { list: null, searchResults: [testState.carts.list[0]] },
    });
    expect(screen.getByText('facere-aut-vel')).toBeInTheDocument();
  });
});
