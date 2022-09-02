import HomeProductSection from '~/components/HomeProductSection';
import ProductList from '~/components/ProductList';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">
      <HomeProductSection />
      <ProductList />
      {/* TODO eliminar div cuando agreguemos contenido */}
      <div className="min-h-[500px]"></div>
    </div>
  );
};

export default Home;
