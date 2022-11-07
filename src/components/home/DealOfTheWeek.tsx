import dynamic from 'next/dynamic';
import Image from 'next/image';

import data from '~/data/promotions.json';

const { promotions } = data;

const Countdown = dynamic(() => import('./Countdown'), { ssr: false });

import Container from '~/layouts/Container';
type DealOfTheWeekProps = {
  promotion: Promotion;
  imagePromotion?: string;
};

const DealOfTheWeek = ({ promotion, imagePromotion }: DealOfTheWeekProps) => {
  const name = promotion.name;
  const description = promotion.description;

  return (
    <section className="w-full bg-gray-200 relative mb-10">
      <Container>
        <div className="grid md:grid-cols-2 gap-y-10 place-items-center">
          <div className="relative h-96 my-6 w-full justify-center">
            <Image
              src={imagePromotion ? imagePromotion : promotions[0].image.src}
              alt={promotion.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="">
            <h4 className="text-secondary text-4xl mb-3 text-center">
              {name ? name : promotions[0].name}
            </h4>
            <p className="mb-5 text-center text-gray-600">
              {description ? description : promotions[0].description}
            </p>
            {promotion.name && <Countdown promotion={promotion} />}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DealOfTheWeek;
