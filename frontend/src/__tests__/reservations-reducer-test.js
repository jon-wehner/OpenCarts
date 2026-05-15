import reservationsReducer from '../store/reservations';

const SET_TIMESLOTS = 'reservations/set_timeslots';
const SET_USER_RESERVATIONS = 'reservations/set_user_reservations';
const DELETE_RESERVATION = 'reservations/delete_reservation';

const mockFutureReservation = {
  id: 2,
  dateTime: '2042-01-27T08:30:00.000Z',
  partySize: 1,
  cartId: 3,
  userId: 1,
  reviewed: false,
  Cart: { id: 3, name: 'sit-non-dignissimos' },
};

const mockPastReservation = {
  id: 1,
  dateTime: '2021-02-07T23:30:00.000Z',
  partySize: 3,
  cartId: 1,
  userId: 1,
  reviewed: true,
  Cart: { id: 1, name: 'facere-aut-vel' },
};

describe('reservationsReducer', () => {
  it('returns initial state when called with undefined', () => {
    const state = reservationsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
      availableTimeSlots: null,
      userFutureReservations: null,
      userPreviousReservations: null,
    });
  });

  it('SET_TIMESLOTS sets availableTimeSlots', () => {
    const slots = ['2024-06-01T12:00:00.000Z', '2024-06-01T12:15:00.000Z'];
    const state = reservationsReducer(undefined, { type: SET_TIMESLOTS, payload: slots });
    expect(state.availableTimeSlots).toEqual(slots);
  });

  it('SET_TIMESLOTS with empty array clears timeslots', () => {
    const state = reservationsReducer(undefined, { type: SET_TIMESLOTS, payload: [] });
    expect(state.availableTimeSlots).toEqual([]);
  });

  it('SET_USER_RESERVATIONS sets future and past reservations from payload', () => {
    const payload = {
      future: [mockFutureReservation],
      past: [mockPastReservation],
    };
    const state = reservationsReducer(undefined, { type: SET_USER_RESERVATIONS, payload });
    expect(state.userFutureReservations).toEqual([mockFutureReservation]);
    expect(state.userPreviousReservations).toEqual([mockPastReservation]);
  });

  it('SET_USER_RESERVATIONS with empty arrays sets both to []', () => {
    const payload = { future: [], past: [] };
    const state = reservationsReducer(undefined, { type: SET_USER_RESERVATIONS, payload });
    expect(state.userFutureReservations).toEqual([]);
    expect(state.userPreviousReservations).toEqual([]);
  });

  it('DELETE_RESERVATION removes the matching reservation from userFutureReservations', () => {
    const initial = {
      availableTimeSlots: null,
      userFutureReservations: [mockFutureReservation],
      userPreviousReservations: [mockPastReservation],
    };
    const state = reservationsReducer(initial, { type: DELETE_RESERVATION, payload: 2 });
    expect(state.userFutureReservations).not.toContainEqual(mockFutureReservation);
  });

  it('DELETE_RESERVATION does not touch userPreviousReservations', () => {
    const initial = {
      availableTimeSlots: null,
      userFutureReservations: [mockFutureReservation],
      userPreviousReservations: [mockPastReservation],
    };
    const state = reservationsReducer(initial, { type: DELETE_RESERVATION, payload: 2 });
    expect(state.userPreviousReservations).toEqual([mockPastReservation]);
  });

  it('DELETE_RESERVATION is a no-op when userFutureReservations is null', () => {
    const initial = {
      availableTimeSlots: null,
      userFutureReservations: null,
      userPreviousReservations: null,
    };
    const state = reservationsReducer(initial, { type: DELETE_RESERVATION, payload: 99 });
    expect(state.userFutureReservations).toBeNull();
  });

  it('unknown action type returns existing state unchanged', () => {
    const existing = {
      availableTimeSlots: null,
      userFutureReservations: null,
      userPreviousReservations: null,
    };
    const state = reservationsReducer(existing, { type: 'UNKNOWN' });
    expect(state).toBe(existing);
  });
});
