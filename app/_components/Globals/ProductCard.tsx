'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { FaRegHeart } from 'react-icons/fa';

import Button from '~/_components/Button';
import { Spinner } from '~/_components/Globals/Spinner';
import Tooltip from '~/_components/Globals/Tooltip';

import { formatCurrency } from '~/_utils/numbers';

interface Props {
  product: Product;
  isAuthenticated: boolean;
  inWishlist: boolean;
  toggleWishlistAction: (productId: string) => Promise<string[]>;
}

const ProductCard = ({ product, isAuthenticated, inWishlist, toggleWishlistAction }: Props) => {
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [wishlist, setWishlist] = useState<boolean>(inWishlist);

  const image = product.images?.[0] || { src: '', alt: 'Not Found' };

  const handleToggleWishlist = async () => {
    setIsWishlistLoading(true);
    const wishlist = await toggleWishlistAction(product.id);
    setWishlist(wishlist.includes(product.id));
    setIsWishlistLoading(false);
    router.refresh();
  };

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
        <div className="flex justify-end h-8">
          {isWishlistLoading ? (
            <span className="mb-3">
              <Spinner size={4} />
            </span>
          ) : (
            <Tooltip
              content="Please log in to use this functionality"
              className={`${isAuthenticated ? 'hidden' : ''}`}
            >
              <button
                onClick={() => {
                  isAuthenticated && handleToggleWishlist().catch((err) => console.log(err));
                }}
              >
                <FaRegHeart
                  className={`cursor-pointer mb-3 transition-all duration-300 hover:text-red-500
                  ${wishlist ? 'text-red-500' : ''}
                  ${isHovered ? 'md:-translate-x-0' : 'md:opacity-0 md:translate-x-3'}`}
                />
              </button>
            </Tooltip>
          )}
        </div>
        <div className="flex mx-auto cursor-pointer relative max-w-full max-h-full h-[436px]">
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
