import CategoriesSlider from '~/components/home/CategoriesSlider';
import HomeHero from '~/components/home/HomeHero';
import ProductHighlight from '~/components/home/ProductHighlight';

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
