import ProductList from '~/components/ProductList';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-600px)] sm:min-h-[calc(100vh-300px)]">
      {/* TODO eliminar div cuando agreguemos contenido */}
      <ProductList />
    </div>
  );
};

export default Home;
