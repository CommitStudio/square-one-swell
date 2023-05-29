import { redirect } from 'next/navigation';

import OrderDetails from './_components/OrderDetails';

import AccountLayout from '~/_layouts/AccountLayout';

import { getUserInfo } from '~/lib/SwellGraphQL';

export const metadata = {
  title: 'SquareOne - Order detail',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function OrderId({ params }: { params: { orderId: string } }) {
  const { user, orders } = await getUserInfo();
  const order = orders.find((order) => order.id === params.orderId);

  if (!order) {
    return redirect('/account/orders');
  }

  return (
    <AccountLayout account={user}>
      <OrderDetails order={order} />
    </AccountLayout>
  );
}
