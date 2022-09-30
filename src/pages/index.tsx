import { GetServerSideProps } from 'next';

import CategoriesSlider from '~/components/home/CategoriesSlider';
import DealOfTheWeek from '~/components/home/DealOfTheWeek';
import HomeHero from '~/components/home/HomeHero';
import ProductHighlight from '~/components/home/ProductHighlight';
import Store from '~/lib/Store';

type HomeProps = {
  products: Product[];
  categories: Category[];
};

const Home = ({ products, categories }: HomeProps) => {
  return (
    <>
      <HomeHero />
      <CategoriesSlider categories={categories} />
      {/* TODO: Update call for specific filter */}
      <ProductHighlight title="Featured Products" products={products} />
      <DealOfTheWeek />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { products } = await Store.getProducts({
    category: 'featured'
  });

  const categories = await Store.getCategories();

  return {
    props: { products, categories }
  };
};

export default Home;
