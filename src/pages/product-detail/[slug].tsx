import { GetServerSideProps } from 'next';
import React from 'react';

import Hero from '~/components/Hero';
import ProductReview from '~/components/product-detail/ProductReview';
import ProductSection from '~/components/product-detail/ProductSection';
import RelatedProducts from '~/components/product-detail/RelatedProducts';
import data from '~/data/product-detail.json';
import Container from '~/layouts/Container';
import Store from '~/lib/Store';

const { test_product } = data;

interface ProductProp {
  product: Product;
  relatedProducts: Product[];
  categories: Category[];
}

const ProductDetail = ({ product, relatedProducts, categories }: ProductProp) => {
  return (
    <>
      <Hero title={product.name} />
      <Container>
        <ProductSection product={product} categories={categories} />
        <ProductReview test_product={test_product} />
        <RelatedProducts title={'Related Products'} product={product} products={relatedProducts} />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.slug) {
    return { notFound: true };
  }
  const { slug } = params;
  const product = await Store.getProductBySlug(slug as string);
  const categories = await Store.getCategories();

  const { products: relatedProducts } = await Store.getProducts({
    maxProducts: 4,
    category: product?.categories?.[0]
  });

  return {
    props: { product, relatedProducts, categories }
  };
};

export default ProductDetail;
