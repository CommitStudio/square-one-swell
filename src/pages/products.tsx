import { GetServerSideProps } from 'next';

import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import { NoResults } from '~/components/globals/NoResults';
import Filter from '~/components/products/Filter';
import Pagination from '~/components/products/Pagination';
import Store from '~/lib/Store';

type ProductsProps = {
  products: Product[];
  backEndPage: number;
  count: number;
  pages: { start: number; end: number }[];
  categories: Category[];
};

const Products = ({ products, count, backEndPage, pages, categories }: ProductsProps) => {
  return (
    <>
      <Hero title="Shop" />
      <Filter categories={categories} />
      {products.length > 0 ? (
        <>
          <ProductList threeColumns products={products} />
          {pages && <Pagination pages={pages} />}
        </>
      ) : (
        <NoResults />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { maxProducts, minPrice, maxPrice, category, page }: FilterParams = query;
  // Se rompe porque cuando no hay pages no manda pages y aca no puede destructurarlo
  const results = await Store.getProducts({
    maxPrice: Number(maxPrice),
    maxProducts: Number(maxProducts),
    page: Number(page),
    minPrice: Number(minPrice),
    category: category
  });

  const products = results.products;
  const count = results.count;
  const backEndPage = results.backEndPage;
  const pages = results.pages || null;

  const categories = await Store.getCategories();

  return {
    props: { products, count, backEndPage, pages, categories }
  };
};

export default Products;
