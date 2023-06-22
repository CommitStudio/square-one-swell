import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';

import { Spinner } from '~/_components/Globals/Spinner';
import Tooltip from '~/_components/Globals/Tooltip';
import { useWishlistState } from '~/_hooks/useStore';

type Props = {
  product: Product;
  isAuthenticated?: boolean;
  isHovered?: boolean;
};

export default function ProductWishlist({ product, isAuthenticated, isHovered }: Props) {
  const { wishlist, setWishlist } = useWishlistState();

  const [isWishlistLoading, setIsWishlistLoading] = useState(false);

  /*****************************************************************************
   * Toggle product from wishlist
   ****************************************************************************/
  const handleToggleWishlist = async () => {
    setIsWishlistLoading(true);
    const wishlistReq = await fetch(`/api/wishlist/${product.id}`, { method: 'PUT' });
    const { wishlist } = (await wishlistReq.json()) as { wishlist: string[] };
    setWishlist(wishlist);
    setIsWishlistLoading(false);
  };

  if (isWishlistLoading) {
    return (
      <span className="mb-3">
        <Spinner size={4} />
      </span>
    );
  }

  return (
    <Tooltip
      content="Please log in to use this functionality"
      className={`${isAuthenticated ? 'hidden' : ''}`}
    >
      <button
        onClick={() => {
          isAuthenticated && handleToggleWishlist();
        }}
      >
        <FaRegHeart
          className={`cursor-pointer mb-3 transition-all duration-300 hover:text-red-500
          ${wishlist?.includes(product.id) ? 'text-red-500' : ''}
          ${isHovered ? 'md:-translate-x-0' : 'md:opacity-0 md:translate-x-3'}
          `}
        />
      </button>
    </Tooltip>
  );
}
