import React from 'react';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

type Rating = {
  rating?: number;
};

const ProductRating = ({ rating }: Rating) => {
  return (
    <div>
      <Rater total={5} rating={rating} />
    </div>
  );
};

export default ProductRating;
