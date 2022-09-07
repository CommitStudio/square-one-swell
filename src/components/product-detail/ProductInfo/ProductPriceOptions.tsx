import React from 'react';

import data from '~/data/product-detail.json';

const { sizes } = data;

const ProductPriceOptions = () => {
  return (
    <div className="space-y-1">
      <div>
        <span className="line-through text-gray-300 mr-2">$90.00</span>
        $24.00
      </div>
      <div className="space-x-0 md:space-x-3">
        <span>Size:</span>
        <span>
          {sizes.map((size) => {
            return (
              <button className="hover:bg-gray-100 p-3 rounded" key={size}>
                {size}
              </button>
            );
          })}
        </span>
      </div>
      {/* TODO: add colors? */}
    </div>
  );
};

export default ProductPriceOptions;
