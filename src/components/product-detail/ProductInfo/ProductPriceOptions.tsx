import React from 'react';

import { formatCurrency } from '~/utils/numbers';

type PriceOptions = {
  price: number;
  salePrice: number | undefined | null;
};

const ProductPriceOptions = ({ price, salePrice }: PriceOptions) => {
  return (
    <div className="space-y-1">
      {salePrice ? (
        <div className="text-xl">
          <span className="flex gap-5">
            <p className="font-quicksand font-bold">U$</p>
            <p className="font-quicksand font-bold">{formatCurrency(salePrice)}</p>{' '}
            <div className="bg-black text-white font-quicksand font-bold py-1 px-2 text-sm">
              SALE
            </div>
          </span>
          <span className="flex">
            <p className="text-gray-medium mr-2 font-quicksand font-bold flex gap-5 relative">
              <span className="absolute h-px bg-gray-medium w-full top-3"></span>
              <span> U$</span>
              <span>{formatCurrency(price)}</span>
            </p>
          </span>
        </div>
      ) : (
        <div>U$ {formatCurrency(price)}</div>
      )}
    </div>
  );
};

export default ProductPriceOptions;
