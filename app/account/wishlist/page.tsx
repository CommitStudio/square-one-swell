import ProductList from './_components/ProductList';

import AccountLayout from '~/_layouts/AccountLayout';

import { getUserInfo, isAuthenticated } from '~/_lib/SwellAPI';
import { getWishlistAction, toggleWishlistAction } from '~/products/_actions/wishlist';

export const metadata = {
  title: 'SquareOne - Addresses',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function Addresses() {
  const { user } = await getUserInfo();
  const auth = await isAuthenticated();

  return (
    <AccountLayout account={user}>
      <ProductList
        isAuthenticated={auth}
        toggleWishlistAction={toggleWishlistAction}
        getWishlistAction={getWishlistAction}
      />
    </AccountLayout>
  );
}
