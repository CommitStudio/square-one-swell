import { useRouter } from 'next/router';

import AccountLayout from '~/components/account/AccountLayout';
import { OrderDetails } from '~/components/orders-detail/OrderDetails';

const OrderDetail = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;

  return (
    <AccountLayout>
      <OrderDetails orderId={orderId} />
    </AccountLayout>
  );
};

export default OrderDetail;
