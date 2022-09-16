import { GetServerSideProps } from 'next';

import CategoriesSlider from '~/components/home/CategoriesSlider';
import DealOfTheWeek from '~/components/home/DealOfTheWeek';
import HomeHero from '~/components/home/HomeHero';
import ProductHighlight from '~/components/home/ProductHighlight';
import Store from '~/lib/Store';

type HomeProps = {
  products: Product[];
};

const Home = ({ products }: HomeProps) => {
  return (
    <>
      <HomeHero />
      <CategoriesSlider />
      {/* TODO: Update call for specific filter */}
      <ProductHighlight products={products} />
      <DealOfTheWeek />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await Store.getProducts({
    category: 'featured'
  });

  return {
    props: { products }
  };
};

export default Home;
