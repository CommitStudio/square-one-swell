import Image from 'next/image';
import Link from 'next/link';

import Button from '~/_components/Button';

import { formatDate } from '~/_utils/dates';
import { formatCurrency } from '~/_utils/numbers';

interface OrderProps {
  order: SwellAPI_Order;
}

const OrderCard = ({ order }: OrderProps) => {
  return (
    <div className="flex flex-col md:flex-row rounded p-4 shadow-md border border-gray mb-6">
      <div className="flex-none w-120">
        <div className="flex">
          <span className="flex-col w-36 h-36 relative">
            <Image
              src={order.items[0].product?.images[0].file.url}
              fill
              style={{ objectFit: 'cover' }}
              alt={`'Image order ${order.number}`}
            />
          </span>
        </div>
      </div>
      <div className="md:ml-10 mt-5 md:mt-0 flex-auto w-64">
        <p className="font-extrabold first-letter:capitalize">{order.status.replace('_', ' ')}</p>
        <div className="text-sm space-y-1 pt-4">
          <p className="space-x-2">
            <span>Date:</span>
            <span>{formatDate(order.dateCreated)}</span>
          </p>
          <p className="space-x-2">
            <span>Number:</span>
            <span>#{order.number}</span>
          </p>
          <p className="space-x-2">
            <span>Total items:</span>
            <span>#{order.itemQuantity}</span>
          </p>
          <p className="space-x-2 font-black pt-4">
            <span>Total:</span>
            <span>
              {order.currency} {formatCurrency(order.grandTotal)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-end">
        <Link href={`/account/orders/${order.id}`}>
          <Button classes="text-xs rounded" label="VIEW MORE" />
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
