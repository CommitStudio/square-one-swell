import Link from 'next/link';
import { useRouter } from 'next/router';

import CategoriesSlider from '~/components/home/CategoriesSlider';
import DealOfTheWeek from '~/components/home/DealOfTheWeek';
import HomeHero from '~/components/home/HomeHero';
import ProductHighlight from '~/components/home/ProductHighlight';

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

export default Home;
