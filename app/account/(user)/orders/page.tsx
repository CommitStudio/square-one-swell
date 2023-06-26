import Link from 'next/link';
import { BiShoppingBag } from 'react-icons/bi';

import OrderCard from './_components/OrderCard';

import Button from '~/_components/Button';

import { getUserInfo } from '~/_lib/SwellAPI';

export const metadata = {
  title: 'SquareOne - Orders',
  description: 'Sit excepteur proident est commodo laboris consectetur ea tempor officia.'
};

export default async function Orders() {
  const { orders } = await getUserInfo();

  return (
    <>
      <h4 className="text-3xl font-medium mb-5 font-libre">Orders</h4>
      {orders.length === 0 ? (
        <>
          <p className="text-gray-dark font-quicksand">You haven&lsquo;t ordered anything yet.</p>
          <Link href="/products">
            <Button
              classes="mt-10 rounded"
              label={
                <div className="flex items-center justify-center space-x-2">
                  <BiShoppingBag />
                  <span>Start shopping</span>
                </div>
              }
            />
          </Link>
        </>
      ) : (
        orders.map((order: SwellAPI_Order) => {
          return <OrderCard order={order} key={order.id} />;
        })
      )}
    </>
  );
}
