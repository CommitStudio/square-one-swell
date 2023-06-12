'use client';

import { useEffect } from 'react';

import ProductCard from '~/_components/Globals/ProductCard';
import { useWishlistState } from '~/_hooks/useStore';

interface Props {
  isAuthenticated: boolean;
  toggleWishlistAction: (productId: string) => Promise<Product[]>;
  getWishlistAction: () => Promise<Product[]>;
}

const ProductList = ({ isAuthenticated, toggleWishlistAction, getWishlistAction }: Props) => {
  const { wishlist, setwishlist } = useWishlistState();

  // Check if wishlist is on global store, if not, get it from Swell
  useEffect(() => {
    if (wishlist != null || !isAuthenticated) return;

    const getWishlistOnFirstRender = async () => {
      const wishlist = await getWishlistAction();
      setwishlist([...wishlist]);
    };

    getWishlistOnFirstRender().catch((err) => console.log(err));
  }, [getWishlistAction, isAuthenticated, setwishlist, wishlist]);

  return (
    <div className="grid grid-cols-3 gap-5">
      {wishlist?.map((product, i) => {
        return (
          <ProductCard
            product={product}
            toggleWishlistAction={toggleWishlistAction}
            getWishlistAction={getWishlistAction}
            isAuthenticated={isAuthenticated}
            key={`card-${i}`}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
