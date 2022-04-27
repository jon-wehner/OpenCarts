import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../CartDetailElements/CartDetails.css';

interface ReviewRatingProps {
  setRating: Function,
}

export default function ReviewRating({ setRating }: ReviewRatingProps) {
  const [displayedRating, setDisplayedRating] = useState(0);
  const updateRating = (n) => {
    console.log(displayedRating);
    setDisplayedRating(n);
    console.log('new rating', displayedRating);
  }
  return (
    <div>
      <FontAwesomeIcon onMouseOver={() => updateRating(1)} icon={faStar} />
      <FontAwesomeIcon onMouseOver={() => updateRating(2)} icon={faStar} />
      <FontAwesomeIcon onMouseOver={() => updateRating(3)} icon={faStar} />
      <FontAwesomeIcon onMouseOver={() => updateRating(4)} icon={faStar} />
      <FontAwesomeIcon onMouseOver={() => updateRating(5)} icon={faStar} />
    </div>
  );
}
