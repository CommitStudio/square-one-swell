import Link from 'next/link';

import { MdPayment } from 'react-icons/md';

import AccountLayout from '~/components/account/AccountLayout';

const payments = () => {
  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Payment methods</h4>
      <p className="text-gray-400">There are no payment methods associated with this account.</p>
      <Link href="#">
        <a className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary">
          <MdPayment />
          ADD NEW PAYMENT METHOD
        </a>
      </Link>
    </AccountLayout>
  );
};

export default payments;
