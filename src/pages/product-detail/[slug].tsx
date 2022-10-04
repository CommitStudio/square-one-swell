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
      <Hero title="Product detail" />
      <Container>
        <ProductSection product={product} categories={categories} />
        <ProductReview test_product={test_product} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }
  const { slug } = params;
  const [product] = await Store.getProducts({ slug } as FilterParams);

  const categories = await Store.getCategories();

  return {
    props: { product, categories }
  };
};

export default ProductDetail;
