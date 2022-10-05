import { GetServerSideProps } from 'next';

import { useRouter } from 'next/router';

import Breadcrumb from '~/components/Breadcrumb';
import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import { NoResults } from '~/components/globals/NoResults';
import Pagination from '~/components/globals/Pagination';
import Filter from '~/components/products/Filter';
import { useStore } from '~/hooks/useStore';
import Store from '~/lib/Store';

type ProductsProps = {
  categories: Category[];
  products: Product[];
  pagination: Pagination;
};

const Products = ({ products, categories, pagination }: ProductsProps) => {
  const router = useRouter();
  const { state } = useStore();
  const selectedCategory = state.breadcrumbSelectedCategory;
  const mainRoute = state.breadcrumbMainRoute;

  return (
    <>
      <Hero
        title={selectedCategory.length > 0 ? selectedCategory : mainRoute}
        breadcrumb={<Breadcrumb />}
      />
      <Filter categories={categories} />
      {products.length > 0 ? (
        <>
          <ProductList threeColumns products={products} />
          {pagination.pages.length > 0 && (
            <Pagination pagination={pagination} pathname={router.pathname} />
          )}
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
