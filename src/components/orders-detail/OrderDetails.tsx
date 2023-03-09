import router from 'next/router';
import SkeletonPlaceholder from '../account/SkeletonPlaceholder';

import { CostDetails } from './CostDetails';
import { DeliveryDetails } from './DeliveryDetails';
import { PaymentDetail } from './PaymentDetails';
import { ProductsDetails } from './ProductsDetails';

import { useGetOrderById } from '~/hooks/useSwellAccount';
import { backToTop } from '~/utils/backToTop';
import { formatDate } from '~/utils/dates';
import { toPascalCase } from '~/utils/format';
import { formatCurrency } from '~/utils/numbers';

interface Props {
  orderId: string;
}

export const OrderDetails = ({ orderId }: Props) => {
  const order = useGetOrderById(orderId);

  return (
    <>
      {order === undefined ? (
        <SkeletonPlaceholder twoCols={false} />
      ) : (
        <>
          <div
            className="text-sm text-secondary cursor-pointer pb-8"
            onClick={() => {
              void router.push('/account/orders');
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 25 25"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="inline text-secondary"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span className="pl-2">Back to all orders</span>
          </div>
          {/* Summary Details */}
          <h3 className="text-xl font-bold pb-4">Order number # {order.number}</h3>
          <div className="leading-7 py-4">
            <p>
              Status:{' '}
              <span className="font-bold">
                {toPascalCase(order.status.replace('_', ' ').toString())}
              </span>
            </p>
            <p>
              Date created:{' '}
              <span className="font-bold">{formatDate(order.date_created || '')}</span>
            </p>
            <p className="pb-5">
              Total:{' '}
              <span className="font-bold">
                {order.currency} {formatCurrency(order.grand_total || 0)}{' '}
              </span>
            </p>
            <p>
              Summary:{' '}
              <span className="font-bold">
                {order.item_quantity} {order.item_quantity > 1 ? 'items' : 'item'}
              </span>
            </p>
          </div>

          <ProductsDetails order={order} />
          <CostDetails order={order} />
          <hr />
          <DeliveryDetails order={order} />
          <PaymentDetail order={order} />

          <hr className="mt-24 mb-3" />
          {/* Back to top */}
          <div
            className="text-center text-sm text-secondary cursor-pointer"
            onClick={() => backToTop()}
          >
            Back to top
          </div>
        </>
      )}
    </>
  );
};
