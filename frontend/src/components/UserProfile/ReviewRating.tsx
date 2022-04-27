import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../CartDetailElements/CartDetails.css';

interface ReviewRatingProps {
  setRating: Function,
}

export default function ReviewRating({ setRating }: ReviewRatingProps) {
  const [displayedRating, setDisplayedRating] = useState(0);

  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    const star = { val: i, className: 'cartDetails__unfilledStar' };
    if (i <= displayedRating) {
      star.className = 'cartDetails__filledStar';
    }
    stars.push(star);
  }
  return (
    <div>
      {stars.map((star) => <FontAwesomeIcon key={star.val} onMouseOver={() => setDisplayedRating(star.val)} icon={faStar} className={star.className} />)}
    </div>
  );
}
