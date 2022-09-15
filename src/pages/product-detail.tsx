import React from 'react';

import Hero from '~/components/Hero';
import ProductReview from '~/components/product-detail/ProductReview';
import ProductSection from '~/components/product-detail/ProductSection';
import data from '~/data/product-detail.json';
import Container from '~/layouts/Container';

const { test_product } = data;

const ProductDetail = () => {
  return (
    <>
      <Hero title="Product detail" />
      <Container>
        <ProductSection test_product={test_product} />
        <ProductReview test_product={test_product} />
      </Container>
    </>
  );
};

export default ProductDetail;
