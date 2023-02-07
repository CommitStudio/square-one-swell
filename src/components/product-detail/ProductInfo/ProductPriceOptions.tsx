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
        <div>
          <span className="line-through text-gray-300 mr-2">U${formatCurrency(price)}</span>
          U$ {formatCurrency(salePrice)}
        </div>
      ) : (
        <div>U$ {formatCurrency(price)}</div>
      )}
    </div>
  );
};

export default ProductPriceOptions;
