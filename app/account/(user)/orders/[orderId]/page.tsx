import { redirect } from 'next/navigation';

import OrderDetails from './_components/OrderDetails';

import { getUserInfo } from '~/_lib/SwellAPI';

export const metadata = {
  title: 'SquareOne - Order detail',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function OrderId({ params }: { params: { orderId: string } }) {
  const { orders } = await getUserInfo();
  const order = orders.find((order) => order.id === params.orderId);

  if (!order) {
    return redirect('/account/orders');
  }

  return <OrderDetails order={order} />;
}
