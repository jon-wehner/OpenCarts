export default function TimeSelect({ onTimeChange, initialTime }) {
  const midnight = new Date(2021, 4, 3, 0, 0, 0);
  const increment = 900000;
  const values = [];
  const innerTexts = [];

  for (let i = 0; i < 96; i += 1) {
    const newTime = new Date(midnight.getTime() + increment * i);
    values.push(newTime.toLocaleTimeString('en-GB'));
    innerTexts.push(newTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
  }

  return (
    <select
      className="reservationSearch__inputs"
      value={initialTime}
      onChange={(e) => onTimeChange(e.target.value)}
    >
      {values.map((time, idx) => (
        <option key={time} value={time}>
          {innerTexts[idx]}
        </option>
      ))}
    </select>
  );
}
