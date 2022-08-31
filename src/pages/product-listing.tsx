import ProductList from '~/components/ProductList';
import Filter from '~/components/product-listing/Filter';
import Hero from '~/components/product-listing/Hero';

const ProductListing = () => {
  return (
    <>
      <Hero />
      <Filter />
      <ProductList />
    </>
  );
};

export default ProductListing;
