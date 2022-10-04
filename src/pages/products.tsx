import { GetServerSideProps } from 'next';

import Breadcrumb from '~/components/Breadcrumb';
import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import Filter from '~/components/products/Filter';
import Pagination from '~/components/products/Pagination';
import { useStore } from '~/hooks/useStore';
import Store from '~/lib/Store';

type ProductsProps = {
  products: Product[];
  categories: Category[];
};

const Products = ({ products, categories }: ProductsProps) => {
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
      <ProductList threeColumns products={products} />
      <Pagination />
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
