import ProductCard from '~/_components/Globals/ProductCard';

import AccountLayout from '~/_layouts/AccountLayout';

import { getUserInfo, getWishlist } from '~/_lib/SwellAPI';
import { toggleWishlistAction } from '~/products/_actions/wishlist';

export const metadata = {
  title: 'SquareOne - Wishlist',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function Addresses() {
  const { authenticated, user } = await getUserInfo();
  const wishlist = await getWishlist();

  return (
    <AccountLayout account={user}>
      <div className="grid grid-cols-3 gap-5">
        {wishlist?.map((product, i) => (
          <ProductCard
            key={`card-${i}`}
            product={product}
            isAuthenticated={authenticated}
            inWishlist={true}
            toggleWishlistAction={toggleWishlistAction}
          />
        ))}
      </div>
    </AccountLayout>
  );
}
