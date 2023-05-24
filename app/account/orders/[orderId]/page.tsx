import { redirect } from 'next/navigation';

import AccountLayout from '~/components/account/AccountLayout';
import OrderDetails from '~/components/account/orders-detail/OrderDetails';

import { getUserInfo } from '~/lib/SwellGraphQL';

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
