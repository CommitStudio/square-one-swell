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
  firstProductPromotion: Product;
};

const Home = ({ products, categories, promotion, firstProductPromotion }: HomeProps) => {
  const imagePromotion = firstProductPromotion.images && firstProductPromotion.images[0].src;
  return (
    <>
      <HomeHero />
      <CategoriesSlider categories={categories} />
      {/* TODO: Update call for specific filter */}
      <ProductHighlight title="Featured Products" products={products} />
      <DealOfTheWeek promotion={promotion} imagePromotion={imagePromotion} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { products } = await Store.getProducts({
    category: 'featured'
  });
  const categories = await Store.getCategories();
  const promotion = await Store.getNextPromotionToBeExpired();
  //get first product of the promotion
  const firstProductPromotion = promotion?.discounts[0]?.buy_items[0]?.product_id
    ? await Store.getProduct(promotion?.discounts[0]?.buy_items[0]?.product_id)
    : {};
  return {
    props: { products, categories, promotion, firstProductPromotion }
  };
};

export default Home;
