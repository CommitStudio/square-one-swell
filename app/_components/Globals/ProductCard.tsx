'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import ProductWishlist from './ProductWishlist';

import Button from '~/_components/Button';

import { formatCurrency } from '~/_utils/numbers';

interface Props {
  product: Product;
  isAuthenticated?: boolean;
  isWishlistCard?: boolean;
}

const ProductCard = ({ product, isAuthenticated, isWishlistCard }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const image = product.images?.[0] || { src: '', alt: 'Not Found' };

  return (
    <div
      data-cy="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col justify-between border-l lg:border-l-0 border-r max-w-md border-gray transition-all duration-300 w-full ${
        isHovered ? 'lg:shadow-[0px_-5px_40px_-15px_rgba(0,0,0,0.3)]' : ''
      }`}
    >
      <div className="px-5 py-4">
        {!isWishlistCard && (
          <div className="flex justify-end h-8">
            <ProductWishlist
              product={product}
              isAuthenticated={isAuthenticated}
              isHovered={isHovered}
            />
          </div>
        )}

        <div
          className={`flex mx-auto cursor-pointer relative max-w-full max-h-full ${
            isWishlistCard ? 'h-[200px]' : 'h-[436px]'
          }`}
        >
          <Link href={`/products/${product.slug}`} data-cy="product-link">
            <Image src={image.src} alt={image.alt} fill style={{ objectFit: 'cover' }} />
          </Link>
        </div>
        <p data-cy="product-name" className="font-quicksand mt-3 mb-3 uppercase line-clamp-2 h-12">
          {product.name}
        </p>
        {product.salePrice ? (
          <div className="mt-auto">
            <span className="flex">
              <p className="font-quicksand font-bold">
                $<span className="ml-2">{formatCurrency(product.salePrice)}</span>
              </p>
              <div className="bg-black text-white font-quicksand font-bold py-1 px-2 text-xs ml-3">
                SALE
              </div>
            </span>
            <p className="font-quicksand text-gray-medium font-bold line-through text-gray-300">
              $<span className="ml-2">{formatCurrency(product.price)}</span>
            </p>
          </div>
        ) : (
          <p className="font-quicksand font-bold mt-auto">
            $<span className="ml-2">{formatCurrency(product.price)}</span>
          </p>
        )}
      </div>
      <Button
        label="VIEW PRODUCT"
        fullWidth
        color="black"
        linkUrl={`/products/${product.slug}`}
        classes={`transition-all duration-300 ${isHovered ? '' : 'md:opacity-0'}`}
      />
    </div>
  );
};

export default ProductCard;
