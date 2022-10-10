import Link from 'next/link';
import { BiShoppingBag } from 'react-icons/Bi';

import AccountLayout from '~/components/account/AccountLayout';

const subscriptions = () => {
  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Subscriptions</h4>
      <p className="text-gray-400">You currently have no subscriptions.</p>
      <Link href="/products">
        <a className="inline-flex items-center gap-1 bg-secondary text-primary p-2 rounded mt-10">
          <BiShoppingBag />
          START SHOPPING
        </a>
      </Link>
    </AccountLayout>
  );
};

export default subscriptions;
