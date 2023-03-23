import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { FaRegHeart } from 'react-icons/fa';

import Tooltip from './globals/Tooltip';

import Button from './globals/button/Button';

import { formatCurrency } from '~/utils/numbers';

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
              <Image src={image.src} alt={image.alt} width={300} height={400} objectFit="cover" />
            </a>
          </Link>
        </div>
        <p className="font-quicksand pt-3 pb-5 uppercase">{product.name}</p>
        {product.salePrice ? (
          <div>
            <span className="flex">
              <p className="font-quicksand font-bold">
                U$ <span className="ml-3">{formatCurrency(product.salePrice)}</span>
              </p>
              <div className="bg-black text-white font-quicksand font-bold p-1 text-xs ml-3">
                SALE
              </div>
            </span>
            <p className="font-quicksand font-bold line-through text-gray-300">
              U$ <span className="ml-3">{formatCurrency(product.price)}</span>
            </p>
          </div>
        ) : (
          <p className="font-quicksand font-bold">U$ {formatCurrency(product.price)}</p>
        )}
      </div>
      <Button
        label="VIEW PRODUCT"
        fullWidth
        color="black"
        linkUrl={`/product-detail/${product.slug}`}
        classes={`transition-all duration-300 ${isHovered ? '' : 'lg:opacity-0'}`}
      />
    </div>
  );
};

export default ProductCard;
