import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
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
        <h1 className="font-bold text-5xl text-secondary mb-6">Shop</h1>

        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/">
                <a className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary">
                  Home
                </a>
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link href="/shop">
                  <a className="ml-1 text-sm font-medium text-secondary hover:text-primary md:ml-2">
                    Shop
                  </a>
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-sm font-medium text-secondary md:ml-2 ">
                  Fullwidth Shop
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Hero;
