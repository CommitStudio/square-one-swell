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
    <header id="header-hero" className="mb-10">
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
              <div className="h-[75vh] w-full relative sm:h-[90vh]">
                <Image src={image.src} alt={image.alt_text} layout="fill" objectFit="cover" />
              </div>
              <div
                id="home-slide-text"
                className={
                  'h-5/6 flex flex-col justify-between items-center absolute bottom-10 left-50 text-center text-slide-shadow sm:h-auto sm:block sm:bottom-20 lg:bottom-40'
                }
              >
                <div>
                  <span className="text-2xl text-primary sm:text-3xl">{image.title}</span>
                  <p className="text-4xl font-bold text-primary sm:mt-4 sm:text-6xl">
                    {image.collection}
                  </p>
                </div>
                <button className="w-fit mb-2 font-bold text-sm text-white bg-secondary py-4 px-10 shadow-[0px_0px_20px_rgba(0,0,0,0.8)] transition-all duration-300 sm:mt-10 sm:mb-0 hover:bg-primary hover:text-secondary">
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
