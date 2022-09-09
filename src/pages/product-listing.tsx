import Hero from '~/components/Hero';
import ProductList from '~/components/ProductList';
import Filter from '~/components/product-listing/Filter';
import Pagination from '~/components/product-listing/Pagination';

const ProductListing = () => {
  return (
    <>
      <Hero title="Products list" />
      <Filter />
      <ProductList threeColumns />
      <Pagination />
    </>
  );
};

export default ProductListing;
