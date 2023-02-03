import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
      <div className="flex flex-col text-center py-4 mb-8">
        <p className="text-4xl py-4">{title}</p>
        <span className="w-[60px] h-[2.5px] bg-secondary mx-auto"></span>
      </div>
      <ProductList products={randomProducts} />
      <div className="w-full flex justify-center my-10">
        <Link href="/products?category=featured">
          <a className="border-2 border-secondary text-secondary text-sm font-bold px-4 py-2 hover:bg-secondary hover:text-primary">
            SEE MORE
          </a>
        </Link>
      </div>
    </>
  );
};

export default ProductHighlight;
