'use client';

import { useState } from 'react';

import AddToCart from '~/components/product-detail/ProductInfo/AddToCart';
import ProductDescription from '~/components/product-detail/ProductInfo/ProductDescription';
import ProductOptions from '~/components/product-detail/ProductInfo/ProductOptions';
import ProductPriceOptions from '~/components/product-detail/ProductInfo/ProductPriceOptions';
import ProductRating from '~/components/product-detail/ProductInfo/ProductRating';
import ProductSocialMedia from '~/components/product-detail/ProductInfo/ProductSocialMedia';
import ProductTitle from '~/components/product-detail/ProductInfo/ProductTitle';

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
