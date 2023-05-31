import AddressContainer from './_components/AddressContainer';

import AccountLayout from '~/_layouts/AccountLayout';

import { getUserInfo } from '~/_lib/SwellGraphQL';

export const metadata = {
  title: 'SquareOne - Addresses',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function Addresses() {
  const { user, addresses } = await getUserInfo();

  return (
    <AccountLayout account={user}>
      <AddressContainer addresses={addresses} />
    </AccountLayout>
  );
}
