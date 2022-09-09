import React from 'react';

import ProductSection from '~/components/product-detail/ProductSection';
import Hero from '~/components/product-listing/Hero';
import Container from '~/layouts/Container';

const ProductDetail = () => {
  return (
    <>
      <Hero title="Product detail" />
      <Container>
        <ProductSection />
      </Container>
    </>
  );
};

export default ProductDetail;
