import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '~/utils/dates';
import { formatCurrency } from '~/utils/numbers';

interface OrderProps {
  order: UserOrder;
}

const OrderCard = ({ order }: OrderProps) => {
  return (
    <div className="flex flex-col md:flex-row rounded bg-primary-lightest p-4 shadow-md border border-gray-50 mb-6">
      <div className="flex-none w-120">
        <div className="flex">
          <span className="flex-col w-36 h-36 relative">
            <Image
              src={order.image1}
              layout="fill"
              objectFit="cover"
              alt={`'Image order ${order.number}`}
            />
          </span>
        </div>
      </div>
      <div className="md:ml-10 mt-5 md:mt-0  flex-auto w-64">
        <p className="font-bold text-lg first-letter:capitalize">
          {order.status.replace('_', ' ')}
        </p>

        <div className="text-sm space-y-1 pt-4">
          <p>
            <span>Date</span>
            <span className="pl-3 font-semibold">{formatDate(order.date)}</span>
          </p>
          <p>
            <span>Number</span>
            <span className="pl-3 font-semibold"># {order.number}</span>
          </p>
          <p>
            <span>Total items</span>
            <span className="pl-3 font-semibold"># {order.items}</span>
          </p>
          <p>
            <span>Total</span>
            <span className="pl-3 font-semibold">
              {order.currency} {formatCurrency(order.total)}
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-end text-sm">
        <Link href={`/account/orders/${order.id}`}>
          <a className="mt-4 text-center px-3 py-1 rounded hover:bg-gray-100 bg-gray-200 transition-all duration-300">
            VIEW MORE
          </a>
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
