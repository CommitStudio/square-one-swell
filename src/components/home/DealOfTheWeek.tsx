import dynamic from 'next/dynamic';
import Image from 'next/image';

const Countdown = dynamic(() => import('./Countdown'), { ssr: false });

import data from '~/data/products.json';

import Container from '~/layouts/Container';

type DealOfTheWeekProps = {
  promotion: Promotion;
};

const DealOfTheWeek = ({ promotion }: DealOfTheWeekProps) => {
  const name = promotion.name;
  const description = promotion.description;
  //const promotionProductId = promotion?.discounts[0].product_id;

  return (
    <section className="w-full bg-gray-200 relative mb-10">
      <Container>
        <div className="grid md:grid-cols-2 gap-y-10 place-items-center">
          <div className="relative h-96 my-6 w-full justify-center">
            <Image
              src={data.products[0].image.src}
              alt={data.products[0].image.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="">
            <h4 className="text-secondary text-4xl mb-3 text-center">
              {name ? name : 'Next Promo will be soon!'}
            </h4>
            <p className="mb-5 text-center text-gray-600">
              {description ? description : "Stay tuned so you won't miss it!"}
            </p>
            <Countdown promotion={promotion} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DealOfTheWeek;
