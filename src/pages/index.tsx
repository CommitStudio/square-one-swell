import CategoriesSlider from '~/components/CategoriesSlider';
import HomeHero from '~/components/HomeHero';
import HomeProductSection from '~/components/HomeProductSection';
import ProductList from '~/components/ProductList';

const Home = () => {
  return (
    <>
      <HomeHero />
      <CategoriesSlider />
      <HomeProductSection />
      <ProductList />
    </>
  );
};

export default Home;
