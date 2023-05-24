import AccountLayout from '~/components/account/AccountLayout';
import OrderDetails from '~/components/account/orders-detail/OrderDetails';

import { getUserInfo } from '~/lib/SwellGraphQL';

export default async function OrderId({ params }: { params: { orderId: string } }) {
  const { user, orders } = await getUserInfo();

  return (
    <AccountLayout account={user}>
      <OrderDetails orderId={params.orderId} orders={orders} />
    </AccountLayout>
  );
}
