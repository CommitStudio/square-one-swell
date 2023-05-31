'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button from '~/_components/Button';

import { useStore } from '~/_hooks/useStore';

export default function SwiperLoader({ categories }: { categories: Category[] }) {
  const { updateStateProp } = useStore();

  const handleClick = (categoryName: string) => {
    updateStateProp('breadcrumbSelectedCategory', categoryName);
  };

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      loop
      watchSlidesProgress
      navigation
      breakpoints={{
        1280: {
          slidesPerView: categories.length <= 3 ? categories.length : 5,
          enabled: categories.length <= 3 ? false : true
        },
        1024: {
          slidesPerView: categories.length <= 3 ? categories.length : 4,
          enabled: categories.length <= 3 ? false : true
        },
        768: {
          slidesPerView: categories.length <= 3 ? categories.length : 3,
          enabled: categories.length <= 3 ? false : true
        },
        500: {
          slidesPerView: 2,
          enabled: categories.length <= 2 ? false : true
        }
      }}
      className="mySwipe"
    >
      {categories
        .filter((category) => category.name !== 'Featured products')
        .map((category, i) => {
          return (
            <SwiperSlide key={`category-slide-${i}`} className="relative grid place-items-center">
              <div
                className={'h-[160px] md:h-[215px] md:max-h-[215px] w-auto relative aspect-square'}
              >
                <Link
                  href={{ pathname: 'products', query: category.slug }}
                  className="cursor-pointer"
                  legacyBehavior
                >
                  <Image
                    src={category.images[0].src}
                    alt={category.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-full cursor-pointer"
                  />
                </Link>
              </div>

              <div className="absolute -bottom-14">
                <Button
                  label={category.name.toUpperCase()}
                  variant="outlined"
                  color="black"
                  linkUrl={{ pathname: 'products', query: category.slug }}
                  action={() => handleClick(category.name)}
                  classes="border-0 !py-0 hover:!bg-white hover:!text-black hover:underline"
                />
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
