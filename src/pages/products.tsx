import { GetServerSideProps } from 'next';

import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import { NoResults } from '~/components/globals/NoResults';
import Filter from '~/components/products/Filter';
import Pagination from '~/components/products/Pagination';
import Store from '~/lib/Store';

type ProductsProps = {
  categories: Category[];
  products: Product[];
  pagination: Pagination;
};

const Products = ({ categories, products, pagination }: ProductsProps) => {
  return (
    <>
      <Hero title="Shop" />
      <Filter categories={categories} />
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
