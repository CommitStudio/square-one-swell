import React, { useState } from 'react';

type PriceOptions = {
  sizes?: string[];
  price?: number;
};

const ProductPriceOptions = ({ sizes, price }: PriceOptions) => {
  const [sizeSelected, setSizeSelected] = useState('');
  return (
    <div className="space-y-1">
      <div>
        <span className="line-through text-gray-300 mr-2">U${price?.toFixed(2)}</span>
        U${price && (price / 2.5).toFixed(2)}
      </div>
      <div className="space-x-0 md:space-x-3">
        <span>Size:</span>
        <span className="space-x-2">
          {sizes?.map((size) => {
            return (
              <button
                className={`hover:bg-gray-100 p-3 rounded ${
                  sizeSelected === size ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setSizeSelected(size);
                }}
                key={size}
              >
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
