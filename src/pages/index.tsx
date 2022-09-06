import CategoriesSlider from '~/components/CategoriesSlider';
import HomeHero from '~/components/HomeHero';
import ProductHighlight from '~/components/product-listing/ProductHighlight';

const Home = () => {
  return (
    <>
      <HomeHero />
      <CategoriesSlider />
      <ProductHighlight />
    </>
  );
};

export default Home;
