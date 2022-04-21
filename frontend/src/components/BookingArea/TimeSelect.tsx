import React from 'react';

interface TimeSelectProps {
  onTimeChange: Function;
  initialTime?: string;
}

export default function TimeSelect({ onTimeChange, initialTime }: TimeSelectProps) {
  const now = new Date();
  const increment = 900000;
  const roundedDate = new Date(Math.round(now.getTime() / increment) * increment);
  const values: string[] = [];
  const innerTexts: string[] = [];

  const getIncrements = (date: Date) => {
    const midnight = new Date(date);
    midnight.setDate(date.getDate() + 1);
    midnight.setHours(0, 0, 0);
    const difference = midnight.getTime() - date.getTime();

    return Math.floor(difference / increment);
  };

  const increments = getIncrements(roundedDate);
  for (let i = 0; i < increments; i += 1) {
    const newTime = new Date(roundedDate.getTime() + increment * i);
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
