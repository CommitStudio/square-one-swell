import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import React, { useEffect } from 'react';

import Hero from '~/components/Hero';
import Head from '~/components/globals/Head';
import ProductReview from '~/components/product-detail/ProductReview';
import ProductSection from '~/components/product-detail/ProductSection';
import RelatedProducts from '~/components/product-detail/RelatedProducts';

import keywords from '~/data/keywords.json';
import data from '~/data/product-detail.json';
import Container from '~/layouts/Container';
import Store from '~/lib/Store';
import { swell as initializedSwell } from '~/lib/SwellClient';

const { test_product } = data;

const { NEXT_PUBLIC_BASE_URL } = process.env;

interface ProductProp {
  product: Product;
  sameCategoryProducts: Product[];
  categories: Category[];
}

const ProductDetail = ({ product, sameCategoryProducts, categories }: ProductProp) => {
  const router = useRouter();

  useEffect(() => {
    const getCart = async () => {
      const cart = (await initializedSwell.cart.get()) as Cart;
      console.log(cart);
    };
    getCart().catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Head
        title={`SquareOne - ${product.name}`}
        description={product.description}
        keywords={keywords.product_detail}
        url={`${NEXT_PUBLIC_BASE_URL}${router.asPath}`}
      />
      <Hero title={product.name} />
      <Container>
        <ProductSection product={product} categories={categories} />
        <ProductReview test_product={test_product} />
        <RelatedProducts
          title={'Related Products'}
          product={product}
          products={sameCategoryProducts}
        />
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

  const { products: sameCategoryProducts } = await Store.getProducts({
    maxProducts: 4,
    category: product?.categories?.[0]
  });

  return {
    props: { product, sameCategoryProducts, categories }
  };
};

export default ProductDetail;
