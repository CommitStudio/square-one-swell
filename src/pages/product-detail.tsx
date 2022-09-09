import React from 'react';

import Hero from '~/components/Hero';
import ProductSection from '~/components/product-detail/ProductSection';
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
