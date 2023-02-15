import { useState } from 'react';
import { MdPayment } from 'react-icons/md';

import AccountLayout from '~/components/account/AccountLayout';
import PaymentCard from '~/components/account/payments/PaymentsCard';
import PaymentsModal from '~/components/account/payments/PaymentsModal';
import { useStore } from '~/hooks/useStore';

const Payments = () => {
  const [open, setOpen] = useState(false);

  const { state } = useStore();
  const { cards } = state as { cards: SwellUserCards };

  const cardList = cards.results;

  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Payment methods</h4>
      {cardList.length === 0 ? (
        <p className="text-gray-400">There are no payment methods associated with this account.</p>
      ) : (
        <div className="grid gap-3 md:auto-rows-fr md:grid-cols-2 md:gap-8">
          {cardList?.map((card, i) => {
            return <PaymentCard card={card} key={card.id} defaultCard={i === 0} />;
          })}
        </div>
      )}
      <button
        className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded my-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
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
