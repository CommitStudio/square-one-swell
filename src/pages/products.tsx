import { GetServerSideProps } from 'next';

import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import Filter from '~/components/products/Filter';
import Pagination from '~/components/products/Pagination';
import Store from '~/lib/Store';

type ProductsProps = {
  products: Product[];
};

const Products = ({ products }: ProductsProps) => {
  return (
    <>
      <Hero title="Shop" />
      <Filter />
      <ProductList threeColumns products={products} />
      <Pagination />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await Store.getProducts(10);
  return {
    props: { products }
  };
};

export default Products;
