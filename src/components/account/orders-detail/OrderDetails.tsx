import SkeletonPlaceholder from '../SkeletonPlaceholder';

import { CostDetails } from './CostDetails';
import { DeliveryDetails } from './DeliveryDetails';
import { PaymentDetail } from './PaymentDetails';
import { ProductsDetails } from './ProductsDetails';

import BackIcon from 'public/img/icons/BackIcon';

import { useGetOrderById } from '~/hooks/useSwellAccount';
import { formatDate } from '~/utils/dates';
import { formatCurrency } from '~/utils/numbers';

interface Props {
  orderId: string;
  orders: SwellGraphQL_OrdersObject[];
}

const OrderDetails = ({ orderId, orders }: Props) => {
  const order = orders.find((order) => order.id === orderId);

  return (
    <>
      {order === undefined ? (
        <SkeletonPlaceholder twoCols={false} />
      ) : (
        <>
          <div
            className="flex items-center text-sm cursor-pointer pb-8 font-quicksand"
            // onClick={() => {
            //   void router.push('/account/orders');
            // }}
          >
            <BackIcon />
            <span className="pl-2 text-black">Back to all orders</span>
          </div>

          {/* Summary Details */}
          <h3 className="text-xl font-bold pb-4">Order number #{order.number}</h3>
          <div className="leading-7 py-4">
            <p>
              Status:
              <span className="pl-2 font-bold capitalize">
                {order.status.replace('_', ' ').toString()}
              </span>
            </p>
            <p>
              Date created: <span className="font-bold">{formatDate(order.dateCreated || '')}</span>
            </p>
            <p className="pb-5">
              Total:
              <span className="pl-2 font-bold">
                {order.currency} {formatCurrency(order.grandTotal || 0)}
              </span>
            </p>
            <p>
              Summary:
              <span className="pl-2 font-bold">
                {order.itemQuantity} {order.itemQuantity > 1 ? 'items' : 'item'}
              </span>
            </p>
          </div>

          <ProductsDetails order={order} />
          <CostDetails order={order} />
          <hr />
          <DeliveryDetails order={order} />
          {/* <PaymentDetail order={order} /> */}

          <hr className="mt-24 mb-3" />
          {/* Back to top */}
          <div
            className="text-center text-sm cursor-pointer"
            // onClick={() =>
            //   window.scrollTo({
            //     top: 0,
            //     behavior: 'smooth'
            //   })
            // }
          >
            Back to top
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
