import {
  tzOffsetToString,
  getRoundedDate,
  getInitialTimeValue,
  getCalendarDateValue,
} from '../utils/utils';

describe('tzOffsetToString', () => {
  it('returns "z" for offset 0', () => {
    expect(tzOffsetToString(0)).toBe('z');
  });

  it('returns negative offset with leading minus for positive input', () => {
    // positive offset means west of UTC → "-HH:00"
    const result = tzOffsetToString(5);
    expect(result).toBe('-05:00');
  });

  it('returns positive offset with leading plus for negative input', () => {
    const result = tzOffsetToString(-5);
    expect(result).toBe('+05:00');
  });

  it('pads single-digit offsets with a leading zero', () => {
    expect(tzOffsetToString(3)).toBe('-03:00');
  });

  it('handles double-digit offsets without extra padding', () => {
    expect(tzOffsetToString(10)).toBe('-10:00');
  });

  it('returns "-01:00" for offset 1 (UTC−1, one hour west of UTC)', () => {
    expect(tzOffsetToString(1)).toBe('-01:00');
  });

  it('returns "+01:00" for offset -1 (UTC+1, one hour east of UTC)', () => {
    expect(tzOffsetToString(-1)).toBe('+01:00');
  });
});

describe('getRoundedDate', () => {
  const FIFTEEN_MINUTES = 900000;

  it('rounds a date to the nearest 15-minute increment', () => {
    // 12:07 should round to 12:00
    const date = new Date('2024-01-01T12:07:00.000Z');
    const rounded = getRoundedDate(date, FIFTEEN_MINUTES);
    expect(rounded.getUTCMinutes()).toBe(0);
  });

  it('rounds up when past the midpoint of an interval', () => {
    // 12:08 should round to 12:15
    const date = new Date('2024-01-01T12:08:00.000Z');
    const rounded = getRoundedDate(date, FIFTEEN_MINUTES);
    expect(rounded.getUTCMinutes()).toBe(15);
  });

  it('returns a Date object', () => {
    const date = new Date();
    const result = getRoundedDate(date, FIFTEEN_MINUTES);
    expect(result).toBeInstanceOf(Date);
  });

  it('returns the same date when already on a boundary', () => {
    const date = new Date('2024-01-01T12:00:00.000Z');
    const rounded = getRoundedDate(date, FIFTEEN_MINUTES);
    expect(rounded.getTime()).toBe(date.getTime());
  });
});

describe('getCalendarDateValue', () => {
  it('formats a date as YYYY-MM-DD', () => {
    // Use a fixed date to avoid locale/TZ issues
    const date = new Date('2024-06-15T12:00:00');
    const result = getCalendarDateValue(date);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('puts the year first', () => {
    const date = new Date('2024-06-15T12:00:00');
    const result = getCalendarDateValue(date);
    expect(result.startsWith('2024')).toBe(true);
  });
});

describe('getInitialTimeValue', () => {
  it('returns a string in HH:MM:SS format', () => {
    const date = new Date();
    const result = getInitialTimeValue(date);
    expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('rounds 12:07 down to 12:00:00', () => {
    const date = new Date();
    date.setHours(12, 7, 0, 0);
    const result = getInitialTimeValue(date);
    expect(result).toBe('12:00:00');
  });

  it('rounds 12:08 up to 12:15:00', () => {
    const date = new Date();
    date.setHours(12, 8, 0, 0);
    const result = getInitialTimeValue(date);
    expect(result).toBe('12:15:00');
  });
});
