import Link from 'next/link';
import React from 'react';

type Categories = {
  categories?: string[];
};

const ProductCategories = ({ categories }: Categories) => {
  return (
    <div>
      <span>Categories:</span>
      {categories?.map((category) => {
        return (
          <Link key={category} href="/">
            <a className="ml-2 cursor-pointer hover:text-primary">{category},</a>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductCategories;
