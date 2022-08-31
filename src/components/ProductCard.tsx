import Image from 'next/image';
import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';

interface Props {
  product: {
    name: string;
    image: {
      src: string;
      alt: string;
    };
    size: string;
    color: string;
    quantity: number;
    price: number;
  };
}

const ProductCard = ({ product }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`max-w-xs border-l lg:border-l-0 border-r transition-all duration-300 ${
        isHovered ? 'lg:shadow-[0px_-5px_40px_-15px_rgba(0,0,0,0.3)]' : ''
      }`}
    >
      <div className="px-4 pt-6 pb-12">
        <div className="flex justify-end">
          <FaRegHeart
            className={`cursor-pointer mb-3 transition-all duration-300 hover:text-red-500 ${
              isHovered ? 'lg:-translate-x-2' : 'lg:opacity-0 lg:translate-x-3'
            }`}
          />
        </div>
        <div className="flex justify-center cursor-pointer">
          <Image src={product.image.src} alt={product.image.alt} width={300} height={300} />
        </div>
        <p className="text-center text-xl pt-3">{product.name}</p>
        <p className="text-center text-red-600 text-xl">${product.price}</p>
      </div>
      <button
        className={`w-full bg-secondary hover:bg-primary hover:text-secondary text-white h-12 font-bold transition-all duration-300 ${
          isHovered ? '' : 'lg:opacity-0'
        }`}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default ProductCard;
