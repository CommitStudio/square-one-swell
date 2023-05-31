'use client';

import Image from 'next/image';

import Breadcrumb from './Breadcrumb';

import { useStore } from '~/_hooks/useStore';

function Hero() {
  const { state } = useStore();

  const selectedCategory = state.breadcrumbSelectedCategory;
  const mainRoute = state.breadcrumbMainRoute;
  const title = selectedCategory.length > 0 ? selectedCategory : mainRoute;

  return (
    <section className="w-full h-[433px] relative">
      <Image
        src="/img/product-listing/products-two-persons.jpg"
        alt="Hero picture"
        priority
        fill
        style={{ objectFit: 'cover' }}
        className="object-top"
      />
      <div className="absolute top-0 left-0 opacity-50 w-full h-full bg-white" />
      <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full">
        <h1 className="font-libre text-4xl font-bold uppercase mb-6">{title}</h1>
        <Breadcrumb />
      </div>
    </section>
  );
}

export default Hero;
