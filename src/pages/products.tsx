import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import Filter from '~/components/products/Filter';
import Pagination from '~/components/products/Pagination';

const Products = () => {
  return (
    <>
      <Hero title="Shop" />
      <Filter />
      <ProductList threeColumns />
      <Pagination />
    </>
  );
};

export default Products;
