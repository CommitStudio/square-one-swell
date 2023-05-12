import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import React from 'react';

import Head from '~/components/globals/Head';
import ProductSection from '~/components/product-detail/ProductSection';
import RelatedProducts from '~/components/product-detail/RelatedProducts';

import keywords from '~/data/keywords.json';
import Container from '~/layouts/Container';
import Store from '~/lib/Store';

const { NEXT_PUBLIC_BASE_URL } = process.env;

interface ProductProp {
  product: Product;
  sameCategoryProducts: Product[];
  categories: Category[];
}

const ProductDetail = ({ product, sameCategoryProducts, categories }: ProductProp) => {
  const router = useRouter();
  return (
    <>
      <Head
        title={`SquareOne - ${product.name}`}
        description={product.description}
        keywords={keywords.product_detail}
        url={`${NEXT_PUBLIC_BASE_URL}${router.asPath}`}
      />
      <Container className="pt-8">
        <Link href="/products">
          <a className="font-quicksand inline-flex items-center gap-2 mb-8 hover:underline">
            <svg
              width="10"
              height="18"
              viewBox="0 0 10 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 1L1 9L9 17" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Product list
          </a>
        </Link>
        <hr className="bg-gray h-px border-none" />
        <ProductSection product={product} categories={categories} />
        {/* ProductReview is commented because the functionality is not working (it just shows hardcoded data) */}
        {/* <ProductReview test_product={product} /> */}
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
