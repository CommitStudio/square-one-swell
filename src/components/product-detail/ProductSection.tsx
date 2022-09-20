import React from 'react';

import ProductImageGallery from '~/components/product-detail/ProductImageGallery';
import ProductInfo from '~/components/product-detail/ProductInfo/ProductInfo';

interface ProductProp {
  product: Product;
}

const ProductSection = ({ product }: ProductProp) => {
  return (
    <div className="flex flex-col md:flex-row my-10">
      <ProductImageGallery product={product} />
      <ProductInfo product={product} />
    </div>
  );
};

export default ProductSection;
