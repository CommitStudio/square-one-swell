'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { BiShoppingBag } from 'react-icons/bi';

import Button from '~/_components/Button';

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
    <>
      {wishlist?.length === 0 ? (
        <>
          <p className="text-gray-dark font-quicksand">
            You don&apos;t have any product on your wishlist yet.
          </p>
          <Link href="/products">
            <Button
              classes="mt-10 rounded"
              label={
                <div className="flex items-center justify-center space-x-2">
                  <BiShoppingBag />
                  <span>Start shopping</span>
                </div>
              }
            />
          </Link>
        </>
      ) : (
        <div className="grid grid-cols-3 gap-5">
          {wishlist?.map((product, i) => {
            return (
              <ProductCard
                product={product}
                toggleWishlistAction={toggleWishlistAction}
                getWishlistAction={getWishlistAction}
                isAuthenticated={isAuthenticated}
                key={`card-${i}`}
                isWishlistCard
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default ProductList;
