import sessionReducer, { clearErrors } from '../store/session';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const SET_ERRORS = 'session/setErrors';
const CLEAR_ERRORS = 'session/clearErrors';

const mockUser = { id: 1, username: 'demo', email: 'demo@user.io' };

describe('sessionReducer', () => {
  it('returns the initial state when called with undefined', () => {
    const state = sessionReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({ user: null, errors: [] });
  });

  it('SET_USER sets user in state', () => {
    const state = sessionReducer(undefined, { type: SET_USER, payload: mockUser });
    expect(state.user).toEqual(mockUser);
  });

  it('SET_USER does not mutate the previous state', () => {
    const before = { user: null, errors: [] };
    const after = sessionReducer(before, { type: SET_USER, payload: mockUser });
    expect(before.user).toBeNull();
    expect(after.user).toEqual(mockUser);
  });

  it('REMOVE_USER sets user to null', () => {
    const withUser = { user: mockUser, errors: [] };
    const state = sessionReducer(withUser, { type: REMOVE_USER });
    expect(state.user).toBeNull();
  });

  it('REMOVE_USER preserves other state fields', () => {
    const withUser = { user: mockUser, errors: ['some error'] };
    const state = sessionReducer(withUser, { type: REMOVE_USER });
    expect(state.errors).toEqual(['some error']);
  });

  it('SET_ERRORS sets the errors array', () => {
    const errors = ['Invalid credentials'];
    const state = sessionReducer(undefined, { type: SET_ERRORS, payload: errors });
    expect(state.errors).toEqual(errors);
  });

  it('CLEAR_ERRORS resets errors to empty array', () => {
    const withErrors = { user: null, errors: ['err1', 'err2'] };
    const state = sessionReducer(withErrors, { type: CLEAR_ERRORS });
    expect(state.errors).toEqual([]);
  });

  it('clearErrors action creator returns the correct action type', () => {
    expect(clearErrors()).toEqual({ type: CLEAR_ERRORS });
  });

  it('unknown action type returns existing state', () => {
    const existing = { user: mockUser, errors: ['e'] };
    const state = sessionReducer(existing, { type: 'UNKNOWN' });
    expect(state).toBe(existing);
  });
});
