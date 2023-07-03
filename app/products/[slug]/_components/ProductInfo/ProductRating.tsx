'use client';

import { Rating } from 'react-simple-star-rating';

const ProductRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-3">
      <Rating
        allowFraction
        initialValue={rating || 0}
        readonly
        size={20}
        SVGclassName="inline"
        fillColor="#242323"
      />
      <span>({rating || 0} stars)</span>
    </div>
  );
};

export default ProductRating;
