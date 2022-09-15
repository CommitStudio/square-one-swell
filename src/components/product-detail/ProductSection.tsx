import React from 'react';

import ProductImageGallery from '~/components/product-detail/ProductImageGallery';
import ProductInfo from '~/components/product-detail/ProductInfo/ProductInfo';

export interface Props {
  test_product: {
    id?: number;
    title?: string;
    rating?: number;
    description?: string;
    price?: number;
    colors?: string[];
    sizes?: string[];
    characteristics?: string[];
    categories?: string[];
    additional_information: {
      Weight?: string;
      Dimensions?: string;
      Materials?: string;
      Size?: string;
    };
  };
}

const ProductSection = ({ test_product }: Props) => {
  return (
    <div className="flex flex-col md:flex-row my-10">
      <ProductImageGallery />
      <ProductInfo test_product={test_product} />
    </div>
  );
};

export default ProductSection;
