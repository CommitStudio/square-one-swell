import Link from 'next/link';
import { FaRegAddressCard } from 'react-icons/fa';

import AccountLayout from '~/components/account/AccountLayout';

const addresses = () => {
  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Addresses</h4>
      <p className="text-gray-400">There are no addresses associated with this account.</p>
      <Link href="#">
        <a className="inline-flex items-center gap-1 bg-secondary text-primary p-2 rounded mt-10">
          <FaRegAddressCard />
          ADD NEW ADDRESS
        </a>
      </Link>
    </AccountLayout>
  );
};

export default addresses;
