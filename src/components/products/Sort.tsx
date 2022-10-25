import React, { useEffect } from 'react';

import ProductList from '../ProductList';

import { useStore } from '~/hooks/useStore';

type SortProps = {
  products: Product[];
};

const Sort = ({ products }: SortProps) => {
  const { state } = useStore();
  const sortParam = state.sortBy;

  const sortProducts = () => {
    const sortedProducts = [...products];

    sortParam === 'Min. Price' &&
      sortedProducts.sort((a, b) => {
        return a.price - b.price;
      });

    sortParam === 'Max. Price' &&
      sortedProducts.sort((a, b) => {
        return b.price - a.price;
      });

    sortParam === 'Older' &&
      sortedProducts.sort((a, b) => {
        return Date.parse(a.dateCreated) - Date.parse(b.dateCreated);
      });

    sortParam === 'Newer' &&
      sortedProducts.sort((a, b) => {
        return Date.parse(b.dateCreated) - Date.parse(a.dateCreated);
      });

    sortParam === 'A to Z' &&
      sortedProducts.sort((a, b) => {
        return a.name.toLowerCase().charCodeAt(0) - b.name.toLowerCase().charCodeAt(0);
      });

    sortParam === 'Z to A' &&
      sortedProducts.sort((a, b) => {
        return b.name.toLowerCase().charCodeAt(0) - a.name.toLowerCase().charCodeAt(0);
      });

    console.log('SORTED', sortedProducts);
    return sortedProducts;
  };

  useEffect(() => {
    sortProducts();
  }, [sortParam]);

  return <ProductList threeColumns products={sortProducts()} />;
};

export default Sort;
