import { GetServerSideProps } from 'next';

import CategoriesSlider from '~/components/home/CategoriesSlider';
import DealOfTheWeek from '~/components/home/DealOfTheWeek';
import HomeHero from '~/components/home/HomeHero';
import ProductHighlight from '~/components/home/ProductHighlight';
import Store from '~/lib/Store';

type HomeProps = {
  products: Product[];
  categories: Category[];
  promotion: Promotion;
};

const Home = ({ products, categories, promotion }: HomeProps) => {
  const productOnPromotionId = promotion?.discounts[0].product_id;
  console.log(productOnPromotionId);
  console.log(products);
  return (
    <>
      <HomeHero />
      <CategoriesSlider categories={categories} />
      {/* TODO: Update call for specific filter */}
      <ProductHighlight title="Featured Products" products={products} />
      <DealOfTheWeek promotion={promotion} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { products } = await Store.getProducts({
    category: 'featured'
  });
  const categories = await Store.getCategories();
  const promotion = await Store.getNextPromotionToBeExpired();
  // const promotionImage = promotion?.discounts[0].product_id;

  return {
    props: { products, categories, promotion }
  };
};

export default Home;
