import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import CategoriesSlider from '~/components/home/CategoriesSlider';
import DealOfTheWeek from '~/components/home/DealOfTheWeek';
import HomeHero from '~/components/home/HomeHero';
import ProductHighlight from '~/components/home/ProductHighlight';
import Store from '~/lib/Store';

type HomeProps = {
  products: Product[];
};

const Home = ({ products }: HomeProps) => {
  const router = useRouter();

  return (
    <>
      <HomeHero />
      <button
        className="bg-primary m-5"
        onClick={() => {
          void router.push('?maxProducts=3');
        }}
      >
        Trae solo 3 productos
      </button>
      <button
        className="bg-primary m-5"
        onClick={() => {
          void router.push('?minPrice=0&maxPrice=100');
        }}
      >
        Productos de 0 a $100
      </button>
      <button
        className="bg-primary m-5"
        onClick={() => {
          void router.push('?minPrice=100&maxPrice=200');
        }}
      >
        Productos de $100 a $200
      </button>
      <button
        className="bg-primary m-5"
        onClick={() => {
          void router.push('/');
        }}
      >
        Traer todos los productos
      </button>
      <CategoriesSlider />
      {/* TODO: Update call for specific filter */}
      <ProductHighlight products={products} />
      <DealOfTheWeek />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await Store.getProducts(
    Number(context?.query?.maxProducts),
    Number(context?.query?.minPrice),
    Number(context?.query?.maxPrice)
  );
  return {
    props: { products }
  };
};
export default Home;
