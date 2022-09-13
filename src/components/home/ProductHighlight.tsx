import React from 'react';

import ProductList from '../ProductList';

type ProductHighlightProps = {
  products: Product[];
};

const ProductHighlight = ({ products }: ProductHighlightProps) => {
  return (
    <>
      <div className="flex flex-col text-center py-4 mb-8">
        <p className="text-4xl py-4">New Product</p>
        <span className="w-[60px] h-[2.5px] bg-secondary mx-auto"></span>
      </div>
      <ProductList products={products} />
      <div className="w-full flex justify-center my-10">
        <button className="border-2 border-secondary text-secondary text-sm font-bold px-4 py-2 hover:bg-secondary hover:text-primary">
          LOAD MORE
        </button>
      </div>
    </>
  );
};

export default ProductHighlight;
