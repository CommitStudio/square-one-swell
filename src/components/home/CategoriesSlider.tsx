import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '../globals/button/Button';

import { useStore } from '~/hooks/useStore';

interface CategoriesProps {
  categories: Category[];
}

const CategoriesSlider = ({ categories }: CategoriesProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { updateStateProp } = useStore();
  const handleClick = (categoryName: string) => {
    updateStateProp('breadcrumbSelectedCategory', categoryName);
  };

  return isMounted ? (
    <div id="slider" className="px-5 mb-5">
      <Swiper
        modules={[Navigation]}
        spaceBetween={0}
        loop
        watchSlidesProgress
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
        {categories.map((category, i) => {
          return (
            <SwiperSlide key={`category-slide-${i}`} className="relative grid place-items-center">
              <div className={'h-[40vw] md:h-[18vw] md:max-h-[18vw] w-auto relative aspect-square'}>
                <Image
                  src={category.images[0].src}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full "
                />
              </div>

              <div className="absolute -bottom-14">
                <Button
                  label={category.name.toUpperCase()}
                  variant="outlined"
                  color="black"
                  linkUrl={{ pathname: 'products', query: category.slug }}
                  action={() => handleClick(category.name)}
                  classes="border-0 hover:!bg-white hover:!text-black hover:underline"
                ></Button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  ) : null;
};

export default CategoriesSlider;
