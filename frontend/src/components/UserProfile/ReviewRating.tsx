import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../CartDetailElements/CartDetails.css';

interface ReviewRatingProps {
  rating: number,
  setRating: Function,
}

export default function ReviewRating({ rating, setRating }: ReviewRatingProps) {
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
    <div className="cartDetails__rating" onMouseLeave={() => setDisplayedRating(rating)}>
      {stars.map((star) => (
        <FontAwesomeIcon
          key={star.val}
          onMouseOver={() => setDisplayedRating(star.val)}
          onClick={() => setRating(star.val)}
          icon={faStar}
          className={star.className}
        />
      ))}
    </div>
  );
}
