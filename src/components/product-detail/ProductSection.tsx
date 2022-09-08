import React from 'react';

import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo/ProductInfo';

import data from '~/data/product-detail.json';

const { test_product } = data;

const ProductSection = () => {
  return (
    <div className="flex flex-col md:flex-row my-10">
      <ProductImageGallery />
      <ProductInfo test_product={test_product} />
    </div>
  );
};

export default ProductSection;
