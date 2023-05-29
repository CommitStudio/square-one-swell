import CategoriesSlider from 'app/_components/home/CategoriesSlider';
import DealOfTheWeek from 'app/_components/home/DealOfTheWeek';
import HomeHero from 'app/_components/home/HomeHero';
import ProductHighlight from 'app/_components/home/ProductHighlight';

import keywords from '~/data/keywords.json';
import Store from '~/lib/Store';

type DataObject = {
  products: Product[];
  categories: Category[];
  promotion: Promotion;
  firstProductPromotion: Product;
};

export const metadata = {
  title: 'SquareOne - Home',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.home,
  url: `${process.env.NEXT_PUBLIC_BASE_URL}/`
};

async function getData() {
  const { products } = await Store.getProducts({
    category: 'featured',
    maxProducts: 20
  });

  const categories = await Store.getCategories();
  const promotion = await Store.getNextPromotionToBeExpired();

  //get first product of the promotion
  const firstProductPromotion = promotion?.discounts[0]?.buy_items[0]?.product_id
    ? await Store.getProduct(promotion?.discounts[0]?.buy_items[0]?.product_id)
    : {};

  return { products, categories, promotion, firstProductPromotion } as DataObject;
}

export default async function Home() {
  const { products, categories, promotion, firstProductPromotion } = await getData();
  const imagePromotion = firstProductPromotion.images && firstProductPromotion?.images[0]?.src;

  return (
    <>
      <HomeHero />
      <CategoriesSlider categories={categories} />
      <ProductHighlight title="Featured Products" products={products} />
      <DealOfTheWeek promotion={promotion} imagePromotion={imagePromotion} />
    </>
  );
}
