import Image from 'next/image';

import keywords from '~/_data/keywords.json';
import Container from '~/_layouts/Container';

const { NEXT_PUBLIC_BASE_URL } = process.env;

export const metadata = {
  title: 'SquareOne - About us',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.',
  keywords: keywords.about_us,
  url: `${NEXT_PUBLIC_BASE_URL}/about-us`
};

const AboutUs = () => (
  <Container className="py-20">
    <h1 className="text-align pb-20 text-4xl font-libre uppercase">About us</h1>
    <div className="font-quicksand grid lg:grid-cols-2 gap-16">
      <p>
        Welcome to our eCommerce site! We are dedicated to providing a top-notch online shopping
        experience for our customers. Our team of experienced professionals is passionate about
        eCommerce and committed to sourcing high-quality products at competitive prices. We
        prioritize customer satisfaction and offer fast shipping, secure payment options, and
        hassle-free returns. We are constantly innovating and improving our platform to ensure a
        seamless and enjoyable shopping experience. Thank you for choosing our eCommerce site for
        your shopping needs. We look forward to serving you and providing an exceptional online
        shopping experience.
      </p>
      <div className="relative h-96 lg:h-auto">
        <Image
          src="/img/heros/about-us.jpg"
          alt="About us picture"
          className="w-full"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>
    </div>
  </Container>
);

export default AboutUs;
