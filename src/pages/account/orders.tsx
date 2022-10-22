import Link from 'next/link';
import { useRouter } from 'next/router';
import { BiShoppingBag } from 'react-icons/bi';

import AccountLayout from '~/components/account/AccountLayout';

import { useSwellAccount } from '~/hooks/useSwellAccount';

export default function Orders() {
  const router = useRouter();
  const logged = useSwellAccount();

  if (logged === null) {
    return null;
  }

  if (logged === false) {
    router.push('/account/login').catch(() => null);
    return null;
  }

  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Orders & Returns</h4>
      <p className="text-gray-400">You haven&lsquo;t ordered anything yet.</p>
      <Link href="/products">
        <a className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary">
          <BiShoppingBag />
          START SHOPPING
        </a>
      </Link>
    </AccountLayout>
  );
}
