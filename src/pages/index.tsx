import CategoriesSlider from '~/components/home/CategoriesSlider';
import DealOfTheWeek from '~/components/home/DealOfTheWeek';
import HomeHero from '~/components/home/HomeHero';
import ProductHighlight from '~/components/home/ProductHighlight';

const Home = () => {
  return (
    <>
      <HomeHero />
      <CategoriesSlider />
      <ProductHighlight />
      <DealOfTheWeek />
    </>
  );
};

export default Home;
