import Image from 'next/image';

import data from '~/data/products.json';
import { useCountdown } from '~/hooks/useCountdown';

import Container from '~/layouts/Container';

const DealOfTheWeek = () => {
  const dateTimeDealWillFinish = new Date('2022-09-13T00:00:00').getTime(); // new Date('Year-Month-DayTHour:Minutes:Seconds').getTime();
  const [days, hours, minutes, seconds] = useCountdown(Number(dateTimeDealWillFinish));
  return (
    <section className="w-full bg-gray-200 relative mb-10">
      <Container>
        <div className="grid md:grid-cols-2 gap-y-10 place-items-center">
          <div className="relative h-96 w-full justify-center">
            <Image
              src={data.products[0].image.src}
              alt={data.products[0].image.alt}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="">
            <h4 className="text-secondary text-4xl mb-3 text-center">Deal Of The Week</h4>
            <p className="mb-5 text-center text-gray-600">Special Discount Limited Time Only</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 justify-between mb-10 md:mb-0">
              <div>
                <div className="bg-secondary text-primary mb-3 mx-auto h-20 w-20 flex justify-center items-center text-3xl">
                  {days}
                </div>
                <p className="text-center text-gray-600">Days</p>
              </div>
              <div>
                <div className="bg-secondary text-primary mb-3 mx-auto h-20 w-20 flex justify-center items-center text-center text-3xl">
                  {hours}
                </div>
                <p className="text-center text-gray-600">Hours</p>
              </div>
              <div>
                <div className="bg-secondary text-primary mb-3 mx-auto h-20 w-20 flex justify-center items-center text-center text-3xl">
                  {minutes}
                </div>
                <p className="text-center text-gray-600">Minutes</p>
              </div>
              <div>
                <div className="bg-secondary text-primary mb-3 mx-auto h-20 w-20 flex justify-center items-center text-center text-3xl">
                  {seconds}
                </div>
                <p className="text-center text-gray-600">Seconds</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DealOfTheWeek;
