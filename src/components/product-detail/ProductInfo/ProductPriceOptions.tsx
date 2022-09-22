import React from 'react';

type PriceOptions = {
  price?: number;
};

const ProductPriceOptions = ({ price }: PriceOptions) => {
  return (
    <div className="space-y-1">
      <div>
        <span className="line-through text-gray-300 mr-2">U${price?.toFixed(2)}</span>
        U${price && (price / 2.5).toFixed(2)}
      </div>
    </div>
  );
};

export default ProductPriceOptions;
