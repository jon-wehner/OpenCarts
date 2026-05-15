import cartsReducer from '../store/carts';

const LOAD = 'carts/load';
const SEARCH = 'carts/search';

const mockCarts = [
  {
    id: 1,
    name: 'facere-aut-vel',
    priceLevel: 1,
    State: { id: 44, name: 'TX' },
    Cuisine: { id: 34, name: 'Ethiopian' },
  },
  {
    id: 2,
    name: 'quo-corporis-molestias',
    priceLevel: 3,
    State: { id: 42, name: 'SD' },
    Cuisine: { id: 58, name: 'Juices' },
  },
];

describe('cartsReducer', () => {
  it('returns the initial state when called with undefined', () => {
    const state = cartsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ list: null, searchResults: null });
  });

  it('LOAD sets the carts list', () => {
    const state = cartsReducer(undefined, { type: LOAD, carts: mockCarts });
    expect(state.list).toEqual(mockCarts);
  });

  it('LOAD preserves searchResults', () => {
    const existing = { list: null, searchResults: [mockCarts[0]] };
    const state = cartsReducer(existing, { type: LOAD, carts: mockCarts });
    expect(state.searchResults).toEqual([mockCarts[0]]);
    expect(state.list).toEqual(mockCarts);
  });

  it('SEARCH sets searchResults', () => {
    const state = cartsReducer(undefined, { type: SEARCH, carts: [mockCarts[0]] });
    expect(state.searchResults).toEqual([mockCarts[0]]);
  });

  it('SEARCH preserves the carts list', () => {
    const existing = { list: mockCarts, searchResults: null };
    const state = cartsReducer(existing, { type: SEARCH, carts: [mockCarts[1]] });
    expect(state.list).toEqual(mockCarts);
    expect(state.searchResults).toEqual([mockCarts[1]]);
  });

  it('SEARCH with empty array sets searchResults to []', () => {
    const state = cartsReducer(undefined, { type: SEARCH, carts: [] });
    expect(state.searchResults).toEqual([]);
  });

  it('unknown action type returns existing state unchanged', () => {
    const existing = { list: mockCarts, searchResults: null };
    const state = cartsReducer(existing, { type: 'UNKNOWN' });
    expect(state).toBe(existing);
  });
});
