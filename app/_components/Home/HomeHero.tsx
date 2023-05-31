'use client';

import Image from 'next/image';
import { Autoplay, EffectFade, Pagination } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '~/_components/Button';

import data from '~/_data/home-hero.json';
import { useStore } from '~/_hooks/useStore';

const HomeHero = () => {
  const { hero_images } = data;

  const { updateStateProp } = useStore();

  const handleClick = (itemName: string) => {
    updateStateProp('breadcrumbSelectedCategory', itemName);
  };

  return (
    <header id="header-hero" className="mb-10 text-white">
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
            <SwiperSlide
              key={`hero-slide-${i}`}
              className="flex flex-col justify-center items-center relative"
            >
              <div className="h-[75vh] w-full relative">
                <Image
                  src={image.src}
                  alt={image.alt_text}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={true}
                  className="h-[75vh] w-full relative"
                />
              </div>
              <div
                id="home-slide-text"
                className={
                  'flex flex-col font-libre text-white justify-between items-center absolute bottom-20 sm:bottom-24 left-50 h-auto'
                }
              >
                <span className="text-l sm:text-xl">{image.title}</span>
                <p className="text-3xl font-bold mt-2 sm:mt-3 sm:text-4xl">{image.collection}</p>
                <Button
                  label="SHOP NOW"
                  color="black"
                  classes="mt-4"
                  linkUrl={`/products?category=${image.slug}`}
                  action={() => handleClick(image.category)}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </header>
  );
};

export default HomeHero;
