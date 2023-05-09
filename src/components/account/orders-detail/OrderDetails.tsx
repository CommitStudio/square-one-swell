import router from 'next/router';

import SkeletonPlaceholder from '../SkeletonPlaceholder';

import { CostDetails } from './CostDetails';
import { DeliveryDetails } from './DeliveryDetails';
import { PaymentDetail } from './PaymentDetails';
import { ProductsDetails } from './ProductsDetails';

import BackIcon from 'public/img/icons/BackIcon';

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
            className="flex items-center text-sm text-secondary cursor-pointer pb-8 font-quicksand"
            onClick={() => {
              void router.push('/account/orders');
            }}
          >
            <BackIcon />
            <span className="pl-2 text-black">Back to all orders</span>
          </div>
          {/* Summary Details */}
          <h3 className="text-xl font-bold pb-4">Order number #{order.number}</h3>
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
          <div className="text-center text-sm cursor-pointer" onClick={() => backToTop()}>
            Back to top
          </div>
        </>
      )}
    </>
  );
};
