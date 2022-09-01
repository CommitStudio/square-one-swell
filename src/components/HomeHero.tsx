import Image from 'next/image';
import { Autoplay, EffectFade, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import data from '~/data/home-hero.json';

const HomeHero = () => {
  const { hero_images } = data;

  return (
    <header id="header-hero">
      <Swiper
        modules={[Pagination, EffectFade, Autoplay]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        slidesPerView={1}
        loop={true}
        effect={'fade'}
        pagination={{ clickable: true }}
      >
        {hero_images.map((image, i) => {
          return (
            <SwiperSlide key={i} className="flex flex-col justify-center items-center relative">
              <div className="h-[50vh] w-full relative sm:h-[90vh]">
                <Image src={image.src} alt={image.alt_text} layout="fill" objectFit="cover" />
              </div>
              <div
                id="home-slide-text"
                className={
                  'absolute bottom-10 left-50 text-center text-slide-shadow sm:bottom-20 lg:bottom-40'
                }
              >
                <span className="text-xl text-primary sm:text-3xl">{image.title}</span>
                <p className="text-3xl font-bold text-primary sm:mt-4 sm:text-6xl">
                  {image.collection}
                </p>
                <button className="mt-52 mb-2 font-bold text-sm text-white bg-secondary py-4 px-10 shadow-[0px_0px_20px_rgba(0,0,0,0.8)] sm:mt-10 sm:mb-0">
                  SHOP NOW
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </header>
  );
};

export default HomeHero;
