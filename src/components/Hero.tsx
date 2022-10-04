import Image from 'next/image';

interface HeroProps {
  title: string;
  breadcrumb?: React.ReactNode;
}

function Hero({ title, breadcrumb }: HeroProps) {
  return (
    <section className="w-full h-72 relative">
      <Image
        src="/img/product-listing/model-poses-casually-on-ride.jpg"
        alt="Hero picture"
        priority
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-0 left-0 opacity-50 w-full h-full bg-white" />
      <div className="absolute flex flex-col justify-center items-center top-0 left-0 w-full h-full">
        <h1 className="font-bold text-5xl text-secondary mb-6">{title}</h1>
        {breadcrumb}
      </div>
    </section>
  );
}

export default Hero;
