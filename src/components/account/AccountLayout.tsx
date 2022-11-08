import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';
import { ToastContainer } from 'react-toastify';

import EditProfileModal from './EditProfileModal';

import { useStore } from '~/hooks/useStore';
import { useLogout } from '~/hooks/useSwellAccount';

import Container from '~/layouts/Container';

type Props = {
  children: React.ReactNode;
};

const AccountLayout = ({ children }: Props) => {
  const router = useRouter();

  const { state } = useStore();
  const [open, setOpen] = useState(false);
  const handleLogout = useLogout();

  return (
    <Container className="mb-10">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="grid gap-10 lg:gap-0 lg:grid-cols-12 pt-10">
        <div className="lg:col-span-3 lg:border-r mr-10">
          <h4 className="flex items-center h-7 font-semibold text-xl mb-2">
            {state.user?.first_name} {state.user?.last_name}
          </h4>
          <p className="h-6 mb-2">{state.user?.email}</p>
          <button
            className="flex items-center gap-1 hover:text-red-600 mb-4"
            onClick={() => setOpen(true)}
          >
            <TbEdit />
            Edit profile
          </button>
          <EditProfileModal open={open} setOpen={setOpen} userInfo={data} />
          <Link href="/account/orders">
            <a
              className={`block ${
                router.pathname.includes('/account/orders') ? 'font-semibold bg-gray-100' : ''
              } hover:bg-gray-100 p-2 mb-1`}
            >
              Orders & Returns
            </a>
          </Link>
          <Link href="/account/subscriptions">
            <a
              className={`block ${
                router.pathname.includes('/account/subscriptions')
                  ? 'font-semibold bg-gray-100'
                  : ''
              } hover:bg-gray-100 p-2 mb-1`}
            >
              Subscriptions
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
            onClick={() => {
              void handleLogout();
            }}
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
