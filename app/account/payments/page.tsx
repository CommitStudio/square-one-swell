import AccountLayout from '~/components/account/AccountLayout';
import CreatePayment from '~/components/account/payments/CreatePayment';
import PaymentCard from '~/components/account/payments/PaymentsCard';

import { getUserInfo } from '~/lib/SwellGraphQL';

export default async function Payments() {
  const { user, cards } = await getUserInfo();

  const defaultCard = user.billing.accountCardId;

  return (
    <AccountLayout account={user}>
      <h4 className="text-3xl font-libre font-medium mb-5">Payment methods</h4>

      {cards.length === 0 ? (
        <p className="text-gray-dark">There are no payment methods associated with this account.</p>
      ) : (
        <div className="grid gap-3 md:auto-rows-fr md:grid-cols-2 md:gap-8">
          {cards?.map((card) => {
            return <PaymentCard card={card} key={card.id} defaultCard={card.id === defaultCard} />;
          })}
        </div>
      )}

      <CreatePayment />
    </AccountLayout>
  );
}
