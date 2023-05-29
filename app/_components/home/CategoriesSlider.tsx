import dynamic from 'next/dynamic';

const SwiperLoader = dynamic(() => import('./SwiperLoader'), { ssr: false });

export default function CategoriesSlider({ categories }: { categories: Category[] }) {
  return (
    <div id="slider" className="relative px-3 mb-5">
      <h5 className="text-center text-2xl pt-4 pb-8 uppercase font-libre">Categories</h5>
      <SwiperLoader categories={categories} />
    </div>
  );
}
