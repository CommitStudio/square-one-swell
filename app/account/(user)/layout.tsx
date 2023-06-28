import EditProfileModal from './_components/EditProfileModal';
import AccountLink from './_components/Link';
import LogOutModal from './_components/LogOutModal';

import Container from '~/_layouts/Container';

import { getUserInfo } from '~/_lib/SwellAPI';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user: account } = await getUserInfo();

  return (
    <Container className="mb-10">
      <div className="grid gap-10 lg:gap-0 lg:grid-cols-12 pt-10 font-quicksand space-x-10">
        <div className="lg:col-span-3 lg:border-r">
          <div className="h-24 flex flex-col justify-center">
            <h4 className="flex items-center h-7 font-semibold text-xl mb-2">
              {account?.firstName} {account?.lastName}
            </h4>
            {account?.email && <p className="h-6 mb-2">{account?.email}</p>}
            <EditProfileModal account={account} />
          </div>
          <div className="space-y-4 my-10">
            <AccountLink href="/account/orders" pathname="/account/orders" label="Orders" />
            <AccountLink
              href="/account/addresses"
              pathname="/account/addresses"
              label="Addresses"
            />
            <AccountLink
              href="/account/payments"
              pathname="/account/payments"
              label="Payment methods"
            />
            <AccountLink href="/account/wishlist" pathname="/account/wishlist" label="Wishlist" />
          </div>
          <LogOutModal />
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </Container>
  );
}
