import React from 'react';

import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo/ProductInfo';

const ProductSection = () => {
  return (
    <div className="flex flex-col md:flex-row my-10">
      <ProductImageGallery />
      <ProductInfo />
    </div>
  );
};

export default ProductSection;
