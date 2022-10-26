import { useState } from 'react';
import { MdPayment } from 'react-icons/md';

import AccountLayout from '~/components/account/AccountLayout';
import PaymentsModal from '~/components/account/PaymentsModal';

const Payments = () => {
  const [open, setOpen] = useState(false);

  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Payment methods</h4>
      <p className="text-gray-400">There are no payment methods associated with this account.</p>

      <button
        className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
        onClick={() => setOpen(true)}
      >
        <MdPayment />
        ADD NEW PAYMENT METHOD
      </button>
      <PaymentsModal open={open} setOpen={setOpen} />
    </AccountLayout>
  );
};

export default Payments;