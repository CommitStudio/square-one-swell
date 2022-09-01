import { A11y, Autoplay, EffectFade, Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import data from '~/data/home-hero.json';

const HomeHero = () => {
  const { images } = data;

  return (
    <header>
      <Swiper
        modules={[Pagination, EffectFade, Autoplay, A11y]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        slidesPerView={1}
        loop={true}
        effect={'fade'}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        className="mySwiper"
      >
        {images.map((image, i) => {
          return (
            <SwiperSlide key={i}>
              <img
                src={image.src}
                alt={image.alt_text}
                className="max-h-[90vh] w-full object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </header>
  );
};

export default HomeHero;
