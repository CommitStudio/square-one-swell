import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { FaRegHeart } from 'react-icons/fa';

import Tooltip from './globals/Tooltip';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const image = product.images?.[0] || { src: '', alt: 'Not Found' };
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col justify-between max-w-xs border-l lg:border-l-0 border-r transition-all duration-300 w-full ${
        isHovered ? 'lg:shadow-[0px_-5px_40px_-15px_rgba(0,0,0,0.3)]' : ''
      }`}
    >
      <div className="px-4 pt-6 pb-12">
        <div className="flex justify-end">
          <Tooltip content="Feature coming soon!">
            <div>
              <FaRegHeart
                className={`cursor-pointer mb-3 transition-all duration-300 hover:text-red-500 ${
                  isHovered ? 'lg:-translate-x-0' : 'lg:opacity-0 lg:translate-x-3'
                }`}
              />
            </div>
          </Tooltip>
        </div>
        <div className="flex justify-center cursor-pointer">
          <Link href={`/product-detail/${product.slug}`}>
            <a>
              <Image src={image.src} alt={image.alt} width={300} height={300} objectFit="cover" />
            </a>
          </Link>
        </div>
        <p className="text-center text-xl pt-3">{product.name}</p>
        {product.salePrice ? (
          <div>
            <p className="text-center text-red-600 text-xl">U$ {product.salePrice?.toFixed(2)}</p>
            <p className="line-through text-gray-300 text-center">U${product.price?.toFixed(2)}</p>
          </div>
        ) : (
          <p className="text-center text-red-600 text-xl">U$ {product.price?.toFixed(2)}</p>
        )}
      </div>
      <Link href={`/product-detail/${product.slug}`}>
        <a
          className={`w-full flex justify-center items-center bg-secondary hover:bg-primary hover:text-secondary text-white h-12 font-bold transition-all duration-300 ${
            isHovered ? '' : 'lg:opacity-0'
          }`}
        >
          VIEW PRODUCT
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
