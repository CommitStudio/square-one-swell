import AccountLayout from '~/components/account/AccountLayout';
import AddressContainer from '~/components/account/address/AddressContainer';

import { getUserInfo } from '~/lib/SwellGraphQL';

export default async function Addresses() {
  const { user } = await getUserInfo();

  return (
    <AccountLayout account={user}>
      <AddressContainer />
    </AccountLayout>
  );
}
