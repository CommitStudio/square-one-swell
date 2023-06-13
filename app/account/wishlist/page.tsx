import ProductList from './_components/ProductList';

import AccountLayout from '~/_layouts/AccountLayout';

import { getUserInfo, isAuthenticated } from '~/_lib/SwellAPI';
import { getWishlistAction, toggleWishlistAction } from '~/products/_actions/wishlist';

export const metadata = {
  title: 'SquareOne - Wishlist',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function Addresses() {
  const { user } = await getUserInfo();
  const auth = await isAuthenticated();

  return (
    <AccountLayout account={user}>
      <h4 className="text-3xl font-medium mb-5 font-libre">Wishlist</h4>
      <ProductList
        isAuthenticated={auth}
        toggleWishlistAction={toggleWishlistAction}
        getWishlistAction={getWishlistAction}
      />
    </AccountLayout>
  );
}
