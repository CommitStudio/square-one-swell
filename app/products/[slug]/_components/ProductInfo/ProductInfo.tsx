'use client';

import { useState } from 'react';

import AddToCart from './AddToCart';
import ProductDescription from './ProductDescription';
import ProductOptions from './ProductOptions';
import ProductPriceOptions from './ProductPriceOptions';
import ProductRating from './ProductRating';
import ProductSocialMedia from './ProductSocialMedia';
import ProductTitle from './ProductTitle';

interface ProductProp {
  product: Product;
  categories: Category[];
}

const ProductInfo = ({ product }: ProductProp) => {
  const [chosenOptions, setChosenOptions] = useState({});

  return (
    <div className="w-full space-y-2 mt-5 md:mt-0">
      <ProductTitle title={product.name} />
      <ProductRating rating={3} />
      <ProductPriceOptions price={product.price} salePrice={product.salePrice} />
      <ProductOptions
        product={product}
        chosenOptions={chosenOptions}
        setChosenOptions={setChosenOptions}
      />
      <AddToCart product={product} chosenOptions={chosenOptions} />
      <ProductDescription description={product.description} />
      <ProductSocialMedia />
    </div>
  );
};

export default ProductInfo;
