import Link from 'next/link';

import BackToTop from './BackToTop';
import { CostDetails } from './CostDetails';
import { DeliveryDetails } from './DeliveryDetails';
import { PaymentDetail } from './PaymentDetails';
import { ProductsDetails } from './ProductsDetails';

import BackIcon from 'public/img/icons/BackIcon';

import { formatDate } from '~/_utils/dates';
import { formatCurrency } from '~/_utils/numbers';

const OrderDetails = ({ order }: { order: SwellAPI_Order }) => {
  return (
    <>
      <Link
        href="/account/orders"
        className="inline-flex items-center text-sm cursor-pointer mb-8 font-quicksand"
      >
        <BackIcon />
        <span className="pl-2 text-black">Back to all orders</span>
      </Link>

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
      <PaymentDetail order={order} />
      <hr className="mt-24 mb-3" />
      <BackToTop />
    </>
  );
};

export default OrderDetails;
