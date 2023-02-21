import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';

import EditProfileModal from './EditProfileModal';
import LogOutModal from './LogOutModal';

import { useAccountState } from '~/hooks/useStore';

import Container from '~/layouts/Container';

type Props = {
  children: React.ReactNode;
};

const AccountLayout = ({ children }: Props) => {
  const router = useRouter();

  const { account } = useAccountState();

  const [openEdit, setOpenEdit] = useState(false);
  const [openLogOut, setOpenLogOut] = useState(false);
  return (
    <Container className="mb-10">
      <div className="grid gap-10 lg:gap-0 lg:grid-cols-12 pt-10">
        <div className="lg:col-span-3 lg:border-r mr-10">
          <div
            className={`h-24 mb-4 flex flex-col justify-center ${account?.email || 'invisible'}`}
          >
            <h4 className="flex items-center h-7 font-semibold text-xl mb-2">
              {account?.first_name} {account?.last_name}
            </h4>
            <p className="h-6 mb-2">{account?.email}</p>
            <button
              className="flex items-center gap-1 hover:text-red-600"
              onClick={() => setOpenEdit(true)}
            >
              <TbEdit />
              Edit profile
            </button>
          </div>
          <EditProfileModal openEdit={openEdit} setOpenEdit={setOpenEdit} />
          <LogOutModal openLogOut={openLogOut} setOpenLogOut={setOpenLogOut} />
          <Link href="/account/orders">
            <a
              className={`block ${
                router.pathname.includes('/account/orders') ? 'font-semibold bg-gray-100' : ''
              } hover:bg-gray-100 p-2 mb-1`}
            >
              Orders
            </a>
          </Link>
          <Link href="/account/addresses">
            <a
              className={`block ${
                router.pathname.includes('/account/addresses') ? 'font-semibold bg-gray-100' : ''
              } hover:bg-gray-100 p-2 mb-1`}
            >
              Addresses
            </a>
          </Link>
          <Link href="/account/payments">
            <a
              className={`block ${
                router.pathname.includes('/account/payments') ? 'font-semibold bg-gray-100' : ''
              } hover:bg-gray-100 p-2`}
            >
              Payment methods
            </a>
          </Link>
          <button
            className="flex items-center gap-1 hover:text-red-600 mt-10"
            onClick={() => setOpenLogOut(true)}
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
