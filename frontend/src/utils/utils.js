export function tzOffsetToString(offset) {
  if (offset === 0) return 'z';
  const digits = offset.toString().length;
  let prepend = '';
  if (offset > 1) {
    prepend += '-';
  } else {
    prepend += '+';
  }
  if (digits === 1) {
    prepend += '0';
  }
  return `${prepend}${Math.abs(offset)}:00`;
}

export function getRoundedDate(date, increment) {
  return new Date(Math.round(date.getTime() / increment) * increment);
}

export function getInitialTimeValue(date) {
  const rounded = getRoundedDate(date, 900000);
  const timeValue = rounded.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });

  return timeValue;
}
