import Image from 'next/image';

import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import { categories } from '~/data/categories.json';
import { useViewportWidth } from '~/hooks/useWindowHooks';

const CategoriesSlider = () => {
  const viewportWidth = useViewportWidth();
  const isMobile = viewportWidth <= 768;
  const enabledSlider = () => {
    if ((isMobile && categories.length > 2) || (!isMobile && categories.length > 3)) return true;
    else return false;
  };
  const slidesPerViewDesktop = categories.length <= 3 ? categories.length : 4;

  return (
    <div id="slider" className="px-5">
      <Swiper
        spaceBetween={20}
        loop
        slidesPerView={isMobile ? 2 : slidesPerViewDesktop}
        enabled={enabledSlider()}
        navigation={enabledSlider()}
        modules={[Navigation]}
        className="mySwipe"
      >
        {categories.map((category, i) => {
          return (
            <SwiperSlide key={i} className="relative grid place-items-center">
              <div className={`h-[250px] w-[350px]`}>
                <Image
                  src={category.image.src}
                  alt={category.image.alt}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="absolute">
                <button className="bg-secondary text-white text-sm hover:bg-primary hover:text-secondary transition-all duration-200 px-9 py-3">
                  {category.name}
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
