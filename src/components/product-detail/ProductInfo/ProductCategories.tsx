import Link from 'next/link';
import React from 'react';

import { v4 as uuidv4 } from 'uuid';

type Categories = {
  categories?: string[];
};

const ProductCategories = ({ categories }: Categories) => {
  return (
    <div>
      <span>Categories:</span>
      {categories?.map((category) => {
        return (
          <Link key={uuidv4()} href="/">
            <a className="ml-2 cursor-pointer hover:text-primary">{category},</a>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductCategories;
