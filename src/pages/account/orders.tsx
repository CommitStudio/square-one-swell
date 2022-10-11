import Link from 'next/link';
import { BiShoppingBag } from 'react-icons/bi';

import AccountLayout from '~/components/account/AccountLayout';

const orders = () => {
  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Orders & Returns</h4>
      <p className="text-gray-400">You haven&lsquo;t ordered anything yet.</p>
      <Link href="/products">
        <a className="inline-flex items-center gap-1 bg-secondary text-primary p-2 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary">
          <BiShoppingBag />
          START SHOPPING
        </a>
      </Link>
    </AccountLayout>
  );
};

export default orders;
