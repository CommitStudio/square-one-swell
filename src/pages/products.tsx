import { GetServerSideProps } from 'next';

import { useEffect } from 'react';

import Breadcrumb from '~/components/Breadcrumb';
import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import Head from '~/components/globals/Head';
import { NoResults } from '~/components/globals/NoResults';
import Pagination from '~/components/globals/Pagination';
import Filter from '~/components/products/Filter';

import Showing from '~/components/products/Showing';
import keywords from '~/data/keywords.json';

import { useStore } from '~/hooks/useStore';

import Store from '~/lib/Store';

const { NEXT_PUBLIC_BASE_URL } = process.env;

type ProductsProps = {
  categories: Category[];
  products: Product[];
  pagination: Pagination;
};

const Products = ({ products, categories, pagination }: ProductsProps) => {
  const { state } = useStore();
  const selectedCategory = state.breadcrumbSelectedCategory;
  const mainRoute = state.breadcrumbMainRoute;

  // console.log('ORIGINAL', products);
  const sortParam = state.sortBy;

  return (
    <>
      <Head
        title="SquareOne - Products"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.products}
        url={`${NEXT_PUBLIC_BASE_URL}/products`}
      />
      <Hero
        title={selectedCategory.length > 0 ? selectedCategory : mainRoute}
        breadcrumb={<Breadcrumb />}
      />
      <Filter categories={categories} pagination={pagination} products={products} />
      {products.length > 0 ? (
        <>
          {sortParam === 'Relevant' ? (
            <ProductList threeColumns products={products} />
          ) : (
            <Sort products={products} />
          )}
          {pagination.pages.length > 0 && <Pagination pagination={pagination} />}
          <Showing className="mb-2 md:my-10 text-center" pagination={pagination} />
        </>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { maxProducts, minPrice, maxPrice, category, page, sort }: FilterParams = query;
  console.log(query);

  const categories = await Store.getCategories();
  const { products, pagination } = await Store.getProducts({
    maxPrice: Number(maxPrice),
    maxProducts: Number(maxProducts),
    page: Number(page),
    sort: sort,
    minPrice: Number(minPrice),
    category: category
  });

  return {
    props: { categories, products, pagination }
  };
};

export default Products;
