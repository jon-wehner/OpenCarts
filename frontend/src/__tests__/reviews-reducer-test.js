import reviewsReducer from '../store/reviews';

const LOAD = 'reviews/load';

const mockReviews = [
  {
    id: 1,
    review: 'LOVE THIS PLACE',
    rating: 5,
    userId: 1,
    cartId: 1,
    reservationId: 1,
  },
];

describe('reviewsReducer', () => {
  it('returns empty object as initial state', () => {
    const state = reviewsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({});
  });

  it('LOAD sets reviews keyed by cartId', () => {
    const state = reviewsReducer(undefined, {
      type: LOAD,
      payload: { reviews: mockReviews, cartId: 1 },
    });
    expect(state[1]).toEqual(mockReviews);
  });

  it('LOAD overwrites existing reviews for the same cartId', () => {
    const existing = { 1: [{ id: 99, review: 'old', rating: 1, userId: 1, cartId: 1, reservationId: 1 }] };
    const state = reviewsReducer(existing, {
      type: LOAD,
      payload: { reviews: mockReviews, cartId: 1 },
    });
    expect(state[1]).toEqual(mockReviews);
  });

  it('LOAD preserves reviews for other cart ids', () => {
    const existing = { 2: [] };
    const state = reviewsReducer(existing, {
      type: LOAD,
      payload: { reviews: mockReviews, cartId: 1 },
    });
    expect(state[1]).toEqual(mockReviews);
    expect(state[2]).toEqual([]);
  });

  it('LOAD with empty reviews array sets cartId key to []', () => {
    const state = reviewsReducer(undefined, {
      type: LOAD,
      payload: { reviews: [], cartId: 5 },
    });
    expect(state[5]).toEqual([]);
  });

  it('unknown action type returns existing state unchanged', () => {
    const existing = { 1: mockReviews };
    const state = reviewsReducer(existing, { type: 'UNKNOWN' });
    expect(state).toBe(existing);
  });
});
