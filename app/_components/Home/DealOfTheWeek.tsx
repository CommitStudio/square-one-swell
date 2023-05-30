import dynamic from 'next/dynamic';
import Image from 'next/image';

import data from '~/_data/promotions.json';
import Container from '~/_layouts/Container';

const { promotions } = data;

type DealOfTheWeekProps = {
  promotion: Promotion;
  imagePromotion?: string;
};

const Countdown = dynamic(() => import('./Countdown'), { ssr: false });

const DealOfTheWeek = ({ promotion, imagePromotion }: DealOfTheWeekProps) => {
  const name = promotion.name;
  const description = promotion.description;

  return (
    <section className="w-full bg-white relative">
      <div className="grid md:grid-cols-2 gap-y-10 place-items-center">
        <div className="relative h-96 my-6 md:my-0 w-full justify-center">
          <Image
            src={imagePromotion ? imagePromotion : promotions[0]?.image.src}
            alt={promotion.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <Container>
          <div className="text-black">
            <h4 className="font-libre uppercase text-4xl mb-3 text-center">
              {name ? name : promotions[0]?.name}
            </h4>
            <p className="font-quicksand mb-5 text-center">
              {description ? description : promotions[0]?.description}
            </p>
            {promotion.name && <Countdown promotion={promotion} />}
          </div>
        </Container>
      </div>
    </section>
  );
};

export default DealOfTheWeek;
