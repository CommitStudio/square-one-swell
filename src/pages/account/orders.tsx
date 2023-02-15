import Link from 'next/link';

import { BiShoppingBag } from 'react-icons/bi';

import AccountLayout from '~/components/account/AccountLayout';
import OrderCard from '~/components/account/OrdersCard';
import { useStore } from '~/hooks/useStore';

const Orders = () => {
  const { state } = useStore();
  const { orders } = state as { orders: UserOrder[] };

  return (
    <AccountLayout>
      <h4 className="text-3xl font-medium mb-5">Orders</h4>
      {orders.length === 0 ? (
        <>
          <p className="text-gray-400">You haven&lsquo;t ordered anything yet.</p>
          <Link href="/products">
            <a className="inline-flex items-center gap-1 bg-secondary text-primary p-3 rounded mt-10 transition-all duration-300 hover:bg-primary hover:text-secondary">
              <BiShoppingBag />
              START SHOPPING
            </a>
          </Link>
        </>
      ) : (
        orders.map((order: UserOrder) => {
          return <OrderCard order={order} key={order.id} />;
        })
      )}
    </AccountLayout>
  );
};

export default Orders;
