import React, { useEffect, useState } from 'react';

import Button from '../globals/button/Button';

import ProductList from '~/components/ProductList';

type ProductHighlightProps = {
  products?: Product[];
  title: string;
};

const ProductHighlight = ({ products, title }: ProductHighlightProps) => {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    setRandomProducts(products ? products.sort(() => Math.random() - 0.5).slice(0, 4) : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col text-center py-4 mb-4 font-libre">
        <p className="text-2xl py-4 uppercase">{title}</p>
      </div>
      <ProductList products={randomProducts} />
      <div className="w-full flex justify-center my-10">
        <Button
          label="SEE MORE"
          color="green"
          linkUrl={'/products?category=featured'}
          classes={`transition-all duration-300`}
        />
      </div>
    </>
  );
};

export default ProductHighlight;
