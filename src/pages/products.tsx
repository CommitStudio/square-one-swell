import { GetServerSideProps } from 'next';

import Breadcrumb from '~/components/Breadcrumb';
import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import Head from '~/components/globals/Head';
import { NoResults } from '~/components/globals/NoResults';
import Pagination from '~/components/globals/Pagination';
import Filter from '~/components/products/Filter';

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
  console.log(products);

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
      <Filter categories={categories} pagination={pagination} />
      {products.length > 0 ? (
        <>
          <ProductList threeColumns products={products} />
          {pagination.pages.length > 0 && <Pagination pagination={pagination} />}
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
