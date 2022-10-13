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
  product: Product;
  categories: Category[];
}

const ProductDetail = ({ product, categories }: ProductProp) => {
  return (
    <>
      <Hero title={product.name} />
      <Container>
        <ProductSection product={product} categories={categories} />
        <ProductReview test_product={test_product} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = String(params?.slug);
  const product = await Store.getProduct(slug);

  if (!product) {
    return { notFound: true };
  }

  const categories = await Store.getCategories();

  return {
    props: { product, categories }
  };
};

export default ProductDetail;
