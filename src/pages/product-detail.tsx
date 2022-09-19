import { GetServerSideProps } from 'next';
import React from 'react';

import Hero from '~/components/Hero';
import ProductReview from '~/components/product-detail/ProductReview';
import ProductSection from '~/components/product-detail/ProductSection';
import data from '~/data/product-detail.json';
import Container from '~/layouts/Container';
import Store from '~/lib/Store';

const { test_product } = data;

interface ProductProp {
  product: [Product];
}

const ProductDetail = ({ product }: ProductProp) => {
  return (
    <>
      <Hero title="Product detail" />
      <Container>
        <ProductSection product={product} />
        <ProductReview test_product={test_product} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { productSlug }: FilterParams = query;

  const product = await Store.getProducts({ productSlug });

  return {
    props: { product }
  };
};

export default ProductDetail;
