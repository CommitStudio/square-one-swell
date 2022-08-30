import React from 'react';

import ProductCard from './ProductCard';

import cartJson from '~/data/global/cart.json';
import Container from '~/layouts/Container';
const { cart } = cartJson;

const ProductList = () => {
  return (
    <Container classes="mt-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 justify-items-center">
        {cart.products.map((product, i) => {
          return <ProductCard product={product} key={i} />;
        })}
      </div>
    </Container>
  );
};

export default ProductList;
