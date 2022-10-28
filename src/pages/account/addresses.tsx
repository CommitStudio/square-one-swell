import { useState } from 'react';

import { FaRegAddressCard } from 'react-icons/fa';

import AccountLayout from '~/components/account/AccountLayout';
import AddressCard from '~/components/account/AddressCard';
import AddressModal from '~/components/account/AddressModal';

const Addresses = () => {
  const [open, setOpen] = useState(false);

  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Addresses</h4>
      <AddressCard />
      <p className="text-gray-400">There are no addresses associated with this account.</p>

      <button
        className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
        onClick={() => setOpen(true)}
      >
        <FaRegAddressCard />
        ADD NEW ADDRESS
      </button>

      <AddressModal open={open} setOpen={setOpen} />
    </AccountLayout>
  );
};

export default Addresses;
