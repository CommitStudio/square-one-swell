import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
import Container from '~/layouts/Container';

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
  const [searchValue, setSearchValue] = useState('');
  const { query } = useRouter();
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
      <Filter categories={categories} searchValue={searchValue} setSearchValue={setSearchValue} />
      {products.length > 0 ? (
        <>
          {query &&
            Object.keys(query).length > 0 && ( // will show the following text, when any query is coming from the url and filtered products are shown
              <Container>
                <p className="inline-block font-quicksand text-xl mb-5 border-b text-black border-gray-medium">
                  Showing {products.length} filtered
                  {products?.length > 1 ? ' products' : ' product'}
                </p>
              </Container>
            )}
          <ProductList threeColumns products={products} />
          {pagination.pages.length > 0 && <Pagination pagination={pagination} />}
          <Showing className="mb-2 md:my-10 text-center font-quicksand" pagination={pagination} />
        </>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { maxProducts, minPrice, maxPrice, category, page, sort, search }: FilterParams = query;

  const categories = await Store.getCategories();
  const { products, pagination } = await Store.getProducts({
    maxPrice: Number(maxPrice),
    maxProducts: Number(maxProducts),
    page: Number(page),
    sort: sort,
    minPrice: Number(minPrice),
    category: category,
    search: search
  });

  return {
    props: { categories, products, pagination }
  };
};

export default Products;
