import ProductCard from './ProductCard';

import data from '~/data/products.json';

import Container from '~/layouts/Container';

const HomeProductSection = () => {
  return (
    <Container className="">
      <div className="flex flex-col text-center py-4">
        <p className="text-4xl py-4">New Product</p>
        <span className="w-[60px] h-[2.5px] bg-secondary mx-auto"></span>
      </div>
      <div className="grid grid-cols-1 gap-y-4 justify-items-center mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product, i) => {
          return <ProductCard product={product} key={i} />;
        })}
      </div>
    </Container>
  );
};

export default HomeProductSection;
