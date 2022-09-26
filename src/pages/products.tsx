import { GetServerSideProps } from 'next';

import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import { NoResults } from '~/components/globals/NoResults';
import { Spinner } from '~/components/globals/Spinner';
import Filter from '~/components/products/Filter';
import Pagination from '~/components/products/Pagination';
import Store from '~/lib/Store';

type ProductsProps = {
  products: Product[];
  categories: Category[];
};

const Products = ({ products, categories }: ProductsProps) => {
  console.log(!products);
  return (
    <>
      <Hero title="Shop" />
      <Filter categories={categories} />

      {!products ? (
        <Spinner />
      ) : products?.length > 0 ? (
        <>
          <ProductList threeColumns products={products} />
          <Pagination />
        </>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { maxProducts, minPrice, maxPrice, category }: FilterParams = query;
  const products = await Store.getProducts({
    maxPrice: Number(maxPrice),
    maxProducts: Number(maxProducts),
    minPrice: Number(minPrice),
    category: category
  });

  const categories = await Store.getCategories();

  return {
    props: { products, categories }
  };
};

export default Products;
