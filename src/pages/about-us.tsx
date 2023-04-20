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
        {/* TODO: TEXT TO BE REVISED */}

        <h1 className="text-align pb-20 text-4xl font-libre uppercase">About us</h1>
        <div className="grid lg:grid-cols-2 gap-16">
          <p className="font-quicksand">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem mollitia voluptates
            odio. Voluptate eligendi iure ex quia ipsum id porro dolorem, pariatur ipsam! Earum
            possimus autem, atque ut asperiores assumenda dignissimos recusandae dicta molestiae
            porro numquam dolore nemo optio ratione quae, hic, perferendis harum velit excepturi.
            Accusamus voluptate voluptates illum temporibus obcaecati repellat sed laborum cum
            reprehenderit magnam? Necessitatibus qui praesentium porro vitae incidunt molestiae
            magnam perferendis officiis, cum sequi quaerat vel? Rerum temporibus veniam nemo aut
            deserunt sequi omnis molestiae sint unde accusantium ducimus nam, aliquid corporis
            similique ullam. Optio corporis cupiditate expedita tenetur obcaecati? Possimus
            distinctio aliquam harum accusamus asperiores reiciendis tenetur, culpa illo ipsam nam
            illum ea tempora beatae cumque magni eaque exercitationem modi quae dolorum quisquam
            omnis eligendi! Nesciunt consectetur.
          </p>
          <div className="relative h-96 lg:h-auto">
            <Image
              src="/img/heros/about-us.jpg"
              alt="About us picture"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutUs;
