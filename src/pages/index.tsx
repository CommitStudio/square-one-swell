import HomeHero from '~/components/HomeHero';
import ProductList from '~/components/ProductList';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">
      <HomeHero />
      <ProductList />
    </div>
  );
};

export default Home;
