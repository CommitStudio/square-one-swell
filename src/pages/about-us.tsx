import Image from 'next/image';

import Head from '~/components/globals/Head';

import keywords from '~/data/keywords.json';
import Container from '~/layouts/Container';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const AboutUs = () => {
  return (
    <>
      <Head
        title="SquareOne - About us"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.about_us}
        url={`${NEXT_PUBLIC_BASE_URL}/about-us`}
      />

      <Container className="py-20">
        <h1 className="text-align pb-20 text-4xl font-libre uppercase">About us</h1>
        <div className="grid lg:grid-cols-2 gap-16">
          <p className="font-quicksand">
            Welcome to our eCommerce site! We are dedicated to providing a top-notch online shopping
            experience for our customers. Our team of experienced professionals is passionate about
            eCommerce and committed to sourcing high-quality products at competitive prices. We
            prioritize customer satisfaction and offer fast shipping, secure payment options, and
            hassle-free returns. We are constantly innovating and improving our platform to ensure a
            seamless and enjoyable shopping experience. Thank you for choosing our eCommerce site
            for your shopping needs. We look forward to serving you and providing an exceptional
            online shopping experience.
          </p>
          <div className="relative h-96 lg:h-auto">
            <Image
              src="/img/heros/about-us.jpg"
              alt="About us picture"
              layout="fill"
              className="w-full"
              objectFit="cover"
              priority
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutUs;
