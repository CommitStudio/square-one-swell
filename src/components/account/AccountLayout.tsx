import { HiOutlineLogout } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';

import EditProfileModal from './EditProfileModal';
import AccountLink from './Link';
import LogOutModal from './LogOutModal';

import Container from '~/layouts/Container';

type Props = {
  account: SwellGraphQL_AccountObject;
  children: React.ReactNode;
};

const AccountLayout = ({ account, children }: Props) => {
  return (
    <Container className="mb-10">
      <div className="grid gap-10 lg:gap-0 lg:grid-cols-12 pt-10 font-quicksand space-x-10">
        <div className="lg:col-span-3 lg:border-r">
          <div className="h-24 flex flex-col justify-center">
            <h4 className="flex items-center h-7 font-semibold text-xl mb-2">
              {account?.firstName} {account?.lastName}
            </h4>
            {account?.email && <p className="h-6 mb-2">{account?.email}</p>}
            <button
              className="flex items-center gap-1 hover:text-red-600"
              // onClick={() => setOpenEdit(true)}
            >
              <TbEdit />
              Edit profile
            </button>
          </div>
          {/* <EditProfileModal />
          <LogOutModal /> */}
          <div className="space-y-4 my-10">
            <AccountLink href="/account/orders" pathname="/account/orders">
              Orders
            </AccountLink>
            <AccountLink href="/account/addresses" pathname="/account/addresses">
              Addresses
            </AccountLink>
            <AccountLink href="/account/payments" pathname="/account/payments">
              Payment methods
            </AccountLink>
          </div>
          <button
            className="flex items-center gap-1 hover:text-red-600 mt-10"
            // onClick={() => setOpenLogOut(true)}
          >
            <HiOutlineLogout />
            Log out
          </button>
        </div>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </Container>
  );
};

export default AccountLayout;
