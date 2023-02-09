import { useState } from 'react';
import { MdPayment } from 'react-icons/md';

import AccountLayout from '~/components/account/AccountLayout';
import PaymentsModal from '~/components/account/PaymentsModal';
import { useStore } from '~/hooks/useStore';

const Payments = () => {
  const [open, setOpen] = useState(false);
  const { state } = useStore();
  const { cards } = state as { cards: SwellUserCards };

  const cardList = cards.results;
  console.log(cardList, 'en payments');
  // Falta recargar las tarjetas

  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Payment methods</h4>
      {!cards ? (
        <>
          <p className="text-gray-400">
            There are no payment methods associated with this account.
          </p>
        </>
      ) : (
        <>
          {cardList?.length}
          {cardList?.map((card) => {
            return <p key={card.id}>Hello card {card.brand}</p>;
          })}
        </>
      )}
      <button
        className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary"
        onClick={() => setOpen(true)}
      >
        <MdPayment />
        ADD NEW CREDIT CARD
      </button>
      <PaymentsModal open={open} setOpen={setOpen} />
    </AccountLayout>
  );
};

export default Payments;
