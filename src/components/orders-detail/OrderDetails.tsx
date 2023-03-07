import { CostDetails } from './CostDetails';
import { DeliveryDetails } from './DeliveryDetails';
import { PaymentDetail } from './PaymentDetails';
import { ProductsDetails } from './ProductsDetails';

import { useGetOrderById } from '~/hooks/useSwellAccount';
import { backToTop } from '~/utils/backToTop';
import { formatDate } from '~/utils/dates';
import { formatCurrency } from '~/utils/numbers';

interface Props {
  orderId: string;
}

export const OrderDetails = ({ orderId }: Props) => {
  const order = useGetOrderById(orderId);

  return (
    <>
      {/* Summary Details */}{' '}
      <h3 className="text-xl font-bold pb-4">Order number # {order?.number}</h3>
      <div className="leading-7 py-4">
        <h4>
          Status:{' '}
          <span className="font-bold first-letter:capitalize">
            {order?.status.replace('_', ' ')}
          </span>
        </h4>
        <p>
          Date created: <span className="font-bold">{formatDate(order?.date_created || '')}</span>
        </p>
        <p className="pb-5">
          Total:{' '}
          <span className="font-bold">
            {order?.currency} {formatCurrency(order?.grand_total || 0)}{' '}
          </span>
        </p>
        <p>
          Summary: <span className="font-bold">{order?.item_quantity} items</span>
        </p>
      </div>
      {order && (
        <>
          <ProductsDetails order={order} />
          <CostDetails order={order} />
          <hr />
          <DeliveryDetails order={order} />
          <PaymentDetail order={order} />
        </>
      )}
      <hr className="mt-24 mb-3" />
      {/* Back to top */}
      <div className="text-center text-sm text-secondary" onClick={() => backToTop()}>
        Back to top
      </div>
    </>
  );
};
