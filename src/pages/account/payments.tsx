import { useState } from 'react';
import { MdPayment } from 'react-icons/md';

import AccountLayout from '~/components/account/AccountLayout';
import PaymentCard from '~/components/account/payments/PaymentsCard';
import PaymentsModal from '~/components/account/payments/PaymentsModal';
import Head from '~/components/globals/Head';
import keywords from '~/data/keywords.json';

import { useGlobalState } from '~/hooks/useStore';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const Payments = () => {
  const [open, setOpen] = useState(false);

  const { cards, account } = useGlobalState();
  const defaultCard = account?.billing?.account_card_id;

  return (
    <>
      <Head
        title="SquareOne - Payments"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.home}
        url={`${NEXT_PUBLIC_BASE_URL}/`}
      />
      <AccountLayout>
        <h4 className="text-3xl font-medium mb-5">Payment methods</h4>
        {cards.length === 0 ? (
          <p className="text-gray-400">
            There are no payment methods associated with this account.
          </p>
        ) : (
          <div className="grid gap-3 md:auto-rows-fr md:grid-cols-2 md:gap-8">
            {cards?.map((card) => {
              return (
                <PaymentCard card={card} key={card.id} defaultCard={card.id === defaultCard} />
              );
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
    </>
  );
};

export default Payments;
