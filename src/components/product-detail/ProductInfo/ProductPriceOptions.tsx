import React from 'react';

type PriceOptions = {
  price?: number;
  salePrice: number | undefined | null;
};

const ProductPriceOptions = ({ price, salePrice }: PriceOptions) => {
  return (
    <div className="space-y-1">
      {salePrice ? (
        <div>
          <span className="line-through text-gray-300 mr-2">U${price?.toFixed(2)}</span>
          U$ {salePrice?.toFixed(2)}
        </div>
      ) : (
        <div>U$ {price?.toFixed(2)}</div>
      )}
    </div>
  );
};

export default ProductPriceOptions;
