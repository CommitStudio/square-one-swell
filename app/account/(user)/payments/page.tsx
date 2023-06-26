import CreatePayment from './_components/CreatePayment';
import PaymentCard from './_components/PaymentsCard';

import { getUserInfo } from '~/_lib/SwellAPI';

export const metadata = {
  title: 'SquareOne - Payments',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function Payments() {
  const { user, cards } = await getUserInfo();

  const defaultCard = user?.billing?.accountCardId;

  return (
    <>
      <h4 className="text-3xl font-libre font-medium mb-5">Payment methods</h4>

      {cards.length === 0 ? (
        <p className="text-gray-dark">There are no payment methods associated with this account.</p>
      ) : (
        <div className="grid gap-3 md:auto-rows-fr md:grid-cols-2 md:gap-8">
          {cards?.map((card) => (
            <PaymentCard card={card} key={card.id} defaultCard={card.id === defaultCard} />
          ))}
        </div>
      )}

      <CreatePayment />
    </>
  );
}
