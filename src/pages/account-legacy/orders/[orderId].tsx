import { useRouter } from 'next/router';

import AccountLayout from '~/components/account/AccountLayout';
import { OrderDetails } from '~/components/account/orders-detail/OrderDetails';
import Head from '~/components/globals/Head';

import keywords from '~/data/keywords.json';

const { NEXT_PUBLIC_BASE_URL } = process.env;

const OrderDetail = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  return (
    <>
      <Head
        title="SquareOne - Order detail"
        description="Sit excepteur proident est commodo laboris consectetur ea tempor officia."
        keywords={keywords.order_id}
        url={`${NEXT_PUBLIC_BASE_URL}/`}
      />
      <AccountLayout>
        <OrderDetails orderId={orderId} />
      </AccountLayout>
    </>
  );
};

export default OrderDetail;
