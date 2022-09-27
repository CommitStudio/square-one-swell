import Link from 'next/link';
import React from 'react';

import { v4 as uuidv4 } from 'uuid';

interface ProductProp {
  product: Product;
  categories: Category[];
}

const ProductCategories = ({ product, categories }: ProductProp) => {
  const productCategories = product.categories?.map((categoryId) => {
    return categories.find((category) => {
      return category.id == categoryId;
    });
  });

  return (
    <div className="flex flex-wrap gap-y-2 items-center">
      <span>Categories:</span>
      {productCategories?.map((category, i) => {
        return (
          <Link key={uuidv4()} href="/">
            <a className="border border-secondary px-2 mx-2.5 cursor-pointer hover:bg-secondary hover:text-primary">
              {category?.name}
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductCategories;
