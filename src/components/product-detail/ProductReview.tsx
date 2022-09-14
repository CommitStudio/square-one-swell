import React, { useState } from 'react';

import AdditionalInfo from '~/components/product-detail/ProductReview/AdditionalInfo';
import ProductRatings from '~/components/product-detail/ProductReview/ProductRatings';

import { Props } from '~/components/product-detail/ProductSection';

const ProductReview = ({ test_product }: Props) => {
  const [tabSelected, setTabSelected] = useState('additional');
  return (
    <div className="my-16">
      <div className="flex justify-center space-x-10 -mb-[1px]">
        <span
          onClick={() => setTabSelected('additional')}
          className={`border border-secondary py-1 px-3 flex items-center cursor-pointer rounded-t ${
            tabSelected === 'additional' ? 'border-b-white font-bold' : ''
          }`}
        >
          Additional information
        </span>
        <span
          onClick={() => setTabSelected('reviews')}
          className={`border border-secondary py-1 px-3 flex items-center cursor-pointer rounded-t ${
            tabSelected === 'reviews' ? 'border-b-white font-bold' : ''
          }`}
        >
          Reviews
        </span>
      </div>
      <div className="border border-secondary rounded">
        {tabSelected === 'additional' && (
          <AdditionalInfo additional_information={test_product.additional_information} />
        )}
        {tabSelected === 'reviews' && <ProductRatings />}
      </div>
    </div>
  );
};

export default ProductReview;
