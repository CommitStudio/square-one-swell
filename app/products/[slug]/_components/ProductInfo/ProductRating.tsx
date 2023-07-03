'use client';

import { Rating } from 'react-simple-star-rating';

import Tooltip from '~/_components/Globals/Tooltip';

const ProductRating = () => {
  return (
    <Tooltip content="Feature coming soon!">
      <Rating initialValue={2} readonly size={20} SVGclassName="inline" fillColor="#242323" />
    </Tooltip>
  );
};

export default ProductRating;
