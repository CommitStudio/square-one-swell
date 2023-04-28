import Image from 'next/image';

interface HeroProps {
  title: string;
  breadcrumb?: React.ReactNode;
}

function Hero({ title, breadcrumb }: HeroProps) {
  return (
    <section className="w-full h-[433px] relative">
      <Image
        src="/img/product-listing/products-two-persons.jpg"
        alt="Hero picture"
        priority
        layout="fill"
        objectFit="cover"
        className="object-top"
      />
      <div className="absolute top-0 left-0 opacity-50 w-full h-full bg-white" />
      <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full">
        <h1 className="font-libre text-4xl font-bold uppercase mb-6">{title}</h1>
        {breadcrumb}
      </div>
    </section>
  );
}

export default Hero;
