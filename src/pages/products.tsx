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

  console.log('ORIGINAL', products);
  // ######################################################################################################################
  const sortParam = state.sortBy;

  const sortProducts = () => {
    const sortedProducts = [...products];

    sortParam === 'Min. Price' &&
      sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });

    sortParam === 'Max. Price' &&
      sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });

    sortParam === 'Older' &&
      sortedProducts.sort((a, b) => {
        return Date.parse(a.dateCreated) - Date.parse(b.dateCreated);
      });

    sortParam === 'Newer' &&
      sortedProducts.sort((a, b) => {
        return Date.parse(b.dateCreated) - Date.parse(a.dateCreated);
      });

    sortParam === 'A to Z' &&
      sortedProducts.sort((a, b) => {
        return a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0);
      });

    sortParam === 'Z to A' &&
      sortedProducts.sort((a, b) => {
        return b.name.toLowerCase().charCodeAt(0) - a.name.toLowerCase().charCodeAt(0);
      });

    console.log('SORTED', sortedProducts);
    return sortedProducts;
  };

  useEffect(() => {
    sortProducts();
  }, [sortProducts, sortParam]);

  // ######################################################################################################################
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
          <ProductList
            threeColumns
            products={sortParam === 'Relevant' ? products : sortProducts()}
          />
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
  const { maxProducts, minPrice, maxPrice, category, page }: FilterParams = query;

  const categories = await Store.getCategories();
  const { products, pagination } = await Store.getProducts({
    maxPrice: Number(maxPrice),
    maxProducts: Number(maxProducts),
    page: Number(page),
    minPrice: Number(minPrice),
    category: category
  });

  return {
    props: { categories, products, pagination }
  };
};

export default Products;
