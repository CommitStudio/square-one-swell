import React from 'react';

import WriteAReview from './WriteAReview';

import Rating from '~/components/product-detail/ProductReview/Rating';

const ProductRatings = () => {
  return (
    <div className="space-y-8 p-5 mx-auto w-full md:w-[1000px]">
      <Rating />
      <Rating />
      <Rating />
      <Rating />
      <WriteAReview />
    </div>
  );
};

export default ProductRatings;
