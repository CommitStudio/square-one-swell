import { GetServerSideProps } from 'next';
import Script from 'next/script';

import Head from '~/components/globals/Head';
import CategoriesSlider from '~/components/home/CategoriesSlider';
import DealOfTheWeek from '~/components/home/DealOfTheWeek';
import HomeHero from '~/components/home/HomeHero';
import ProductHighlight from '~/components/home/ProductHighlight';

import keywords from '~/data/keywords.json';

import Store from '~/lib/Store';

const { NEXT_PUBLIC_BASE_URL, GTM_ID } = process.env;

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
      <Head
        title="SquareOne - Home"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.home}
        url={`${NEXT_PUBLIC_BASE_URL}/`}
      />
      {/* Global site tag (gtag.js) - Google Analytics */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${GTM_ID}');
        `}
      </Script>

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
