import React from 'react';

import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';

const ProductSection = () => {
  return (
    <div className="flex">
      <ProductImageGallery />
      <ProductInfo />
    </div>
  );
};

export default ProductSection;
