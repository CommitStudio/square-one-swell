import Link from 'next/link';
import { BiShoppingBag } from 'react-icons/bi';

import Button from '~/_components/Button';
import ProductCard from '~/_components/Globals/ProductCard';

import { getUserInfo, getWishlist } from '~/_lib/SwellAPI';

export const metadata = {
  title: 'SquareOne - Wishlist',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function Addresses() {
  const { authenticated } = await getUserInfo();
  const wishlist = await getWishlist();

  return (
    <>
      <h4 className="text-3xl font-medium mb-5 font-libre">Wishlist</h4>

      {wishlist.length === 0 && (
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
      )}

      {wishlist.length > 0 && (
        <div className="grid grid-cols-3 gap-5">
          {wishlist?.map((product, i) => (
            <ProductCard
              key={`card-${i}`}
              product={product}
              isAuthenticated={authenticated}
              isWishlistCard
            />
          ))}
        </div>
      )}
    </>
  );
}
