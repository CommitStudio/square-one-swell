import React from 'react';

interface ProductProp {
  product: Product;
}

function ProductStock({ product }: ProductProp) {
  const alertStock = product.stock && product.stock <= 5;
  const minStock = product.stock && product.stock <= 1;

  return (
    <>
      {product.stock
        ? alertStock &&
          minStock && (
            <p className="text-red-400">
              {`Only ${product.stock} item${product.stock > 1 ? 's' : ''} left!`}
            </p>
          )
        : ''}
    </>
  );
}

export default ProductStock;
