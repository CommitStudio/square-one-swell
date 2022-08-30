import React from 'react';

import ProductCard from './ProductCard';

import cartJson from '~/data/global/cart.json';
import Container from '~/layouts/Container';
const { cart } = cartJson;

const ProductList = () => {
  return (
    <Container classes="mt-32">
      {cart.products.map((product, i) => {
        return <ProductCard product={product} key={i} />;
      })}
    </Container>
  );
};

export default ProductList;
