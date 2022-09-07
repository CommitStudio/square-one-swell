import ProductList from '~/components/ProductList';
import Filter from '~/components/product-listing/Filter';
import Hero from '~/components/product-listing/Hero';
import Pagination from '~/components/product-listing/Pagination';

const ProductListing = () => {
  return (
    <>
      <Hero />
      <Filter />
      <ProductList threeColumns />
      <Pagination />
    </>
  );
};

export default ProductListing;
