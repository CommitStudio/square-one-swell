import { GetServerSideProps } from 'next';
import Link from 'next/link';

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
      <Link href="?maxProducts=3">
        <a className="bg-primary m-5"> Trae solo 3 productos</a>
      </Link>
      <Link href="?minPrice=0&maxPrice=100">
        <a className="bg-primary m-5"> Productos de 0 a $100</a>
      </Link>
      <Link href="?minPrice=100&maxPrice=200">
        <a className="bg-primary m-5"> Productos de $100 a $200</a>
      </Link>
      <Link href="">
        <a className="bg-primary m-5"> Traer todos los productos</a>
      </Link>
      <Filter />
      <ProductList threeColumns products={products} />
      <Pagination />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { maxProducts, minPrice, maxPrice } = query;
  const products = await Store.getProducts({
    maxPrice: Number(maxPrice),
    maxProducts: Number(maxProducts),
    minPrice: Number(minPrice)
  });

  return {
    props: { products }
  };
};

export default Products;
