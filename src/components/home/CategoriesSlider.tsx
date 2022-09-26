import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { v4 as uuidv4 } from 'uuid';

import categoriesJson from '~/data/categories.json';
const { categories } = categoriesJson;

const CategoriesSlider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <div id="slider" className="px-5 mb-5">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        loop
        navigation
        breakpoints={{
          768: {
            slidesPerView: categories.length <= 3 ? categories.length : 4,
            enabled: categories.length <= 3 ? false : true
          },
          375: {
            slidesPerView: 2,
            enabled: categories.length <= 2 ? false : true
          }
        }}
        className="mySwipe"
      >
        {categories.map((category) => {
          return (
            <SwiperSlide key={uuidv4()} className="relative grid place-items-center">
              <div className={`h-[250px] w-[350px]`}>
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="absolute bottom-10">
                <button className="bg-secondary text-white text-sm hover:bg-primary hover:text-secondary transition-all duration-200 px-9 py-3">
                  {category.name}
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  ) : null;
};

export default CategoriesSlider;
