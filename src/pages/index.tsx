import CategoriesSlider from '~/components/CategoriesSlider';
import ProductList from '~/components/ProductList';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">
      {/* TODO eliminar div cuando agreguemos contenido */}
      <CategoriesSlider />
      <ProductList />
      <div className="min-h-[500px]"></div>
    </div>
  );
};

export default Home;
