import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { categories } from '~/data/categories.json';
import Container from '~/layouts/Container';

const CategoriesSlider = () => {
  return (
    <Container className="mb-10">
      <Swiper slidesPerView={4} spaceBetween={20} loop={true} className="mySwiper">
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
                <button className="bg-white px-10 py-3 text-sm hover:bg-primary transition-all duration-200">
                  {category.name}
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
};

export default CategoriesSlider;
