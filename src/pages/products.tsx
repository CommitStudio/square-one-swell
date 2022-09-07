import ProductList from '~/components/ProductList';
import Filter from '~/components/products/Filter';
import Hero from '~/components/products/Hero';
import Pagination from '~/components/products/Pagination';

const Products = () => {
  return (
    <>
      <Hero />
      <Filter />
      <ProductList threeColumns />
      <Pagination />
    </>
  );
};

export default Products;
