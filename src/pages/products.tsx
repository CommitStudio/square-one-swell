import ProductList from '~/components/ProductList';
import Filter from '~/components/product-listing/Filter';
import Hero from '~/components/product-listing/Hero';
import Pagination from '~/components/product-listing/Pagination';

const Products = () => {
  return (
    <>
      <Hero />
      <Filter />
      <ProductList />
      <Pagination />
    </>
  );
};

export default Products;
