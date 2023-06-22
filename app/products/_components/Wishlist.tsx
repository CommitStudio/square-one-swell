import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import { Spinner } from '~/_components/Globals/Spinner';
import Tooltip from '~/_components/Globals/Tooltip';

import useFetch from '~/_hooks/useFetch';

type Props = {
  isAuthenticated: boolean;
  productId: string;
};

export default function Wishlist({ isAuthenticated, productId }: Props) {
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const [inWishlist, setInWishlist] = useState<boolean | null>(null);

  /*****************************************************************************
   * Retrieve wishlist status
   ****************************************************************************/
  const wishlistUrl = isAuthenticated ? `/api/wishlist/${productId}` : null;
  const { data, loading } = useFetch<{ status: boolean }>(wishlistUrl);

  /*****************************************************************************
   * Define "wishlisted" status
   ****************************************************************************/
  useEffect(() => {
    setInWishlist(data?.status ?? null);
  }, [data]);

  /*****************************************************************************
   * Toggle product from wishlist
   ****************************************************************************/
  const handleToggleWishlist = async () => {
    setIsWishlistLoading(true);
    const wishlistReq = await fetch(`/api/wishlist/${productId}`, { method: 'PUT' });
    const { wishlist } = (await wishlistReq.json()) as { wishlist: string[] };
    setInWishlist(wishlist.includes(productId));
    setIsWishlistLoading(false);
  };

  /** Wait for wishlist status to be retrieved */
  if (loading) {
    return null;
  }

  /** Show spinner while toggling from wishlist */
  if (isWishlistLoading) {
    return (
      <div className="pb-1 pl-1">
        <Spinner size={5} />
      </div>
    );
  }

  /** Show wishlist indicator & toggle button */
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
