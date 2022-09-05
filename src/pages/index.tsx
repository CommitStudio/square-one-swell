import HomeHero from '~/components/HomeHero';
import HomeProductSection from '~/components/HomeProductSection';
import ProductList from '~/components/ProductList';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">
      <HomeHero />
      <HomeProductSection />
      <ProductList />
    </div>
  );
};

export default Home;
