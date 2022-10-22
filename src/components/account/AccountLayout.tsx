import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiOutlineLogout } from 'react-icons/hi';
import { TbEdit } from 'react-icons/tb';

import { useIsLogged, useLogout } from '~/hooks/useSwellAccount';

import Container from '~/layouts/Container';

type Props = {
  children: React.ReactNode;
};

const AccountLayout = ({ children }: Props) => {
  const router = useRouter();
  const handleLogout = useLogout();

  if (useIsLogged() === null) {
    return null;
  }

  return (
    <Container className="mb-10">
      <div className="grid gap-10 lg:gap-0 lg:grid-cols-12 pt-10">
        <div className="lg:col-span-3 lg:border-r mr-10">
          <h4 className="font-semibold text-xl mb-2">John Doe</h4>
          <p className="mb-2">john_doe@gmail.com</p>
          <button className="flex items-center gap-1 hover:text-red-600 mb-4">
            <TbEdit />
            Edit profile
          </button>
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
