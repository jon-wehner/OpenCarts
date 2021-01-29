export function tzOffsetToString (offset) {
  if(offset === 0) return `z`
  const digits = offset.toString().length;
  let prepend = ""
  if (offset > 1) {
    prepend += '-'
  } else {
    prepend += '+'
  }
  if (digits === 1) {
    prepend += '0'
  }
  return `${prepend}${Math.abs(offset)}:00`
}
