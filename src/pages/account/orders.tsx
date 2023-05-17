import Link from 'next/link';

import { BiShoppingBag } from 'react-icons/bi';

import AccountLayout from '~/components/account/AccountLayout';
import OrderCard from '~/components/account/OrdersCard';
import Head from '~/components/globals/Head';
import Button from '~/components/globals/button/Button';
import keywords from '~/data/keywords.json';
import { useGlobalState } from '~/hooks/useStore';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const Orders = () => {
  const { orders } = useGlobalState();

  return (
    <>
      <Head
        title="SquareOne - Orders"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.home}
        url={`${NEXT_PUBLIC_BASE_URL}/`}
      />
      <AccountLayout>
        <h4 className="text-3xl font-medium mb-5 font-libre">Orders</h4>
        {orders.length === 0 ? (
          <>
            <p className="text-gray-dark font-quicksand">You haven&lsquo;t ordered anything yet.</p>
            <Link href="/products">
              <a>
                <Button
                  classes="mt-10 rounded"
                  label={
                    <div className="flex items-center justify-center space-x-2">
                      <BiShoppingBag />
                      <span>Start shopping</span>
                    </div>
                  }
                />
              </a>
            </Link>
          </>
        ) : (
          orders.map((order: UserOrder) => {
            return <OrderCard order={order} key={order.id} />;
          })
        )}
      </AccountLayout>
    </>
  );
};

export default Orders;
