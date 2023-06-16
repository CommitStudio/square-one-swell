import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import { Spinner } from '~/_components/Globals/Spinner';
import Tooltip from '~/_components/Globals/Tooltip';
import useFetch from '~/_hooks/useFetch';

export default function Wishlist({
  isAuthenticated,
  productId
}: {
  isAuthenticated: boolean;
  productId: string;
}) {
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [wishlist, setWishlist] = useState<boolean | null>(null);

  const wishlistUrl = isAuthenticated ? `/api/wishlist/${productId}` : null;
  const { data, loading } = useFetch<{ status: boolean }>(wishlistUrl);

  if (loading) {
    return null;
  }

  /*****************************************************************************
   * Toggle product from wishlist
   ****************************************************************************/
  const handleToggleWishlist = async () => {
    setIsWishlistLoading(true);
    const wishlistReq = await fetch(`/api/wishlist/${productId}`, { method: 'PUT' });
    const { wishlist } = (await wishlistReq.json()) as { wishlist: string[] };
    setWishlist(wishlist.includes(productId));
    setIsWishlistLoading(false);
  };

  /*****************************************************************************
   * Define "wishlisted" status
   ****************************************************************************/
  const inWishlist = data?.status === true || wishlist === true;

  if (isWishlistLoading) {
    return (
      <div className="pb-1 pl-1">
        <Spinner size={5} />
      </div>
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
        className="py-3 hover:text-secondary hover:border-secondary duration-200"
      >
        <AiOutlineHeart className={`h-6 w-6 ${inWishlist ? 'text-red-500' : ''}`} />
      </button>
    </Tooltip>
  );
}
