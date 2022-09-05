import CategoriesSlider from '~/components/CategoriesSlider';
import HomeHero from '~/components/HomeHero';
import ProductList from '~/components/ProductList';

const Home = () => {
  return (
    <>
      <HomeHero />
      <CategoriesSlider />
      <div className="flex flex-col text-center py-4 mb-8">
        <p className="text-4xl py-4">New Product</p>
        <span className="w-[60px] h-[2.5px] bg-secondary mx-auto"></span>
      </div>
      <ProductList />
    </>
  );
};

export default Home;
