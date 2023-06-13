import ProductList from './_components/ProductList';

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
      <ProductList
        isAuthenticated={authenticated}
        wishlist={wishlist}
        toggleWishlistAction={toggleWishlistAction}
      />
    </AccountLayout>
  );
}
