import Link from 'next/link';
import { redirect } from 'next/navigation';
import { BiShoppingBag } from 'react-icons/bi';

import AccountLayout from '~/components/account/AccountLayout';
import OrderCard from '~/components/account/OrdersCard';
import Button from '~/components/globals/button/Button';

import { getLoggedUser } from '~/lib/SwellGraphQL';

async function getData() {
  const user = await getLoggedUser();

  if (!user?.session.accountId) {
    return redirect('/account/login');
  }

  return {
    user: user.account,
    orders: user.orders.results
  };
}

export default async function Test() {
  const { user, orders } = await getData();

  console.log(orders);

  return (
    <AccountLayout account={user}>
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
        orders.map((order: SwellGraphQL_OrdersObject) => {
          return <OrderCard order={order} key={order.id} />;
        })
      )}
    </AccountLayout>
  );
}
