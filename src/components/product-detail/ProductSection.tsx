import React from 'react';

import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';

const ProductSection = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <ProductImageGallery />
      <ProductInfo />
    </div>
  );
};

export default ProductSection;
